const Order = require("../models/Order");
const Cart = require("../models/Cart");
const User = require("../models/User");
const Product = require("../models/Product");
const TopDeal = require("../models/TopDeal");

// 🛍️ Create Order
const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { address, paymentMethod, paymentId, products } = req.body;
    
    console.log('Create Order Request:', { userId, address: address ? 'provided' : 'missing', paymentMethod, paymentId: paymentId ? 'provided' : 'missing', productsCount: products?.length || 0 });

    if (!address || !paymentMethod || !paymentId) {
      return res.status(400).json({ msg: "Missing required fields: address, paymentMethod, or paymentId" });
    }

    let orderProducts;
    
    // Check if products are provided directly in the request (for Buy Now)
    if (products && Array.isArray(products) && products.length > 0) {
      console.log('Processing direct purchase with products:', products);
      // Validate the products structure for direct purchase
      for (const item of products) {
        if (!item.productId || !item.quantity) {
          return res.status(400).json({ msg: "Invalid product data in request" });
        }
      }
      
      // Validate that products exist in the database
      for (const item of products) {
        // Check if product exists in Product collection
        let productExists = await Product.findById(item.productId);
        if (!productExists) {
          // If not found by _id, try finding by custom id field
          productExists = await Product.findOne({ id: parseInt(item.productId) });
        }
        
        // If still not found, check TopDeal collection
        if (!productExists) {
          productExists = await TopDeal.findById(item.productId);
          if (!productExists) {
            // If not found by _id, try finding by custom id field
            productExists = await TopDeal.findOne({ id: parseInt(item.productId) });
          }
        }
        
        if (!productExists) {
          console.log('Product not found in database:', item.productId);
          return res.status(400).json({ msg: `Product not found: ${item.productId}` });
        }
      }
      
      orderProducts = [];
      for (const item of products) {
        // Find the actual product to get its MongoDB _id
        let product = await Product.findById(item.productId);
        if (!product) {
          // If not found by _id, try finding by custom id field
          product = await Product.findOne({ id: parseInt(item.productId) });
        }
        
        // If still not found, check TopDeal collection
        if (!product) {
          product = await TopDeal.findById(item.productId);
          if (!product) {
            // If not found by _id, try finding by custom id field
            product = await TopDeal.findOne({ id: parseInt(item.productId) });
          }
        }
        
        if (!product) {
          console.log('Product not found in database during mapping:', item.productId);
          return res.status(400).json({ msg: `Product not found: ${item.productId}` });
        }
        
        orderProducts.push({
          productId: product._id,
          quantity: item.quantity
        });
      }
    } else {
      console.log('Processing cart-based purchase');
      // Otherwise, get products from user's cart (traditional cart-based order)
      const cart = await Cart.findOne({ userId });
      
      if (!cart || cart.products.length === 0) {
        return res.status(400).json({ msg: "Cart is empty" });
      }
      
      // Validate that all products in the cart exist in the database
      orderProducts = [];
      for (const cartItem of cart.products) {
        // Find the actual product to get its details
        let product = await Product.findById(cartItem.productId);
        if (!product) {
          // If not found in Product collection, check TopDeal collection
          product = await TopDeal.findById(cartItem.productId);
        }
        
        if (!product) {
          console.log('Product in cart not found in database:', cartItem.productId);
          return res.status(400).json({ msg: `Product not found: ${cartItem.productId}` });
        }
        
        orderProducts.push({
          productId: product._id,
          quantity: cartItem.quantity
        });
      }
      
      // Clear the cart after creating the order
      await Cart.findOneAndDelete({ userId });
    }

    const order = new Order({
      userId,
      products: orderProducts,
      address,
      paymentMethod,
      paymentId, // Store the payment ID from Razorpay
      status: "Placed",
    });

    await order.save();
    console.log('Order created successfully:', order._id);

    res.status(201).json(order);
  } catch (error) {
    console.error('Error in createOrder:', error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// 📜 Get My Orders
const getMyOrders = async (req, res) => {
  try {
    // Get orders without populating to get the raw product IDs
    let orders = await Order.find({ userId: req.user.id });
    
    // Manually populate products from both collections
    for (let order of orders) {
      for (let item of order.products) {
        // Try to find product in Product collection
        let product = await Product.findById(item.productId);
        if (!product) {
          // If not found, try TopDeal collection
          product = await TopDeal.findById(item.productId);
        }
        
        if (!product) {
          // If still not found, try by custom id
          product = await Product.findOne({ id: parseInt(item.productId) });
          if (!product) {
            product = await TopDeal.findOne({ id: parseInt(item.productId) });
          }
        }
        
        // Attach the found product data to the item
        item.productId = product || null;
      }
    }
    
    res.json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// 🔍 Get Order by ID
const getOrderById = async (req, res) => {
  try {
    // Get order without populating to get the raw product IDs
    let order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ msg: "Order not found" });
    
    // Manually populate products from both collections
    for (let item of order.products) {
      // Try to find product in Product collection
      let product = await Product.findById(item.productId);
      if (!product) {
        // If not found, try TopDeal collection
        product = await TopDeal.findById(item.productId);
      }
      
      if (!product) {
        // If still not found, try by custom id
        product = await Product.findOne({ id: parseInt(item.productId) });
        if (!product) {
          product = await TopDeal.findOne({ id: parseInt(item.productId) });
        }
      }
      
      // Attach the found product data to the item
      item.productId = product || null;
    }
    
    res.json(order);
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// 📋 Get All Orders (Admin only)
const getAllOrders = async (req, res) => {
  try {
    // First, get orders without populating to get the raw product IDs
    let orders = await Order.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    
    // Manually populate products from both collections
    for (let order of orders) {
      for (let item of order.products) {
        // Try to find product in Product collection
        let product = await Product.findById(item.productId);
        if (!product) {
          // If not found, try TopDeal collection
          product = await TopDeal.findById(item.productId);
        }
        
        if (!product) {
          // If still not found, try by custom id
          product = await Product.findOne({ id: parseInt(item.productId) });
          if (!product) {
            product = await TopDeal.findOne({ id: parseInt(item.productId) });
          }
        }
        
        // Attach the found product data to the item
        item.productId = product || null;
      }
    }
    
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// 🔄 Update Order Status (Admin only)
const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['Placed', 'Packed', 'Shipped', 'Delivered', 'Cancelled'];
  
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ msg: 'Invalid status' });
  }
  
  try {
    // Get the order without populating to get the raw product IDs
    let order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('userId', 'name email');
    
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }
    
    // Manually populate products from both collections
    for (let item of order.products) {
      // Try to find product in Product collection
      let product = await Product.findById(item.productId);
      if (!product) {
        // If not found, try TopDeal collection
        product = await TopDeal.findById(item.productId);
      }
      
      if (!product) {
        // If still not found, try by custom id
        product = await Product.findOne({ id: parseInt(item.productId) });
        if (!product) {
          product = await TopDeal.findOne({ id: parseInt(item.productId) });
        }
      }
      
      // Attach the found product data to the item
      item.productId = product || null;
    }
    
    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// 📊 Get Admin Statistics (Admin only)
const getAdminStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: 'products.productId',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      {
        $addFields: {
          orderTotal: {
            $sum: {
              $map: {
                input: '$products',
                as: 'product',
                in: {
                  $multiply: [
                    { $arrayElemAt: ['$productDetails.price', { $indexOfArray: ['$productDetails._id', '$$product.productId'] }] },
                    '$$product.quantity'
                  ]
                }
              }
            }
          }
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$orderTotal' }
        }
      }
    ]);
    
    const stats = {
      totalOrders,
      totalRevenue: totalRevenue[0]?.totalRevenue || 0,
      pendingOrders: await Order.countDocuments({ status: 'Placed' }),
      shippedOrders: await Order.countDocuments({ status: 'Shipped' }),
      deliveredOrders: await Order.countDocuments({ status: 'Delivered' }),
    };
    
    res.json(stats);
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  getAdminStats,
};
