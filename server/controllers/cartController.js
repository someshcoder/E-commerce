const Cart = require("../models/Cart");

// ➕ Add to Cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({
      userId,
      products: [{ productId, quantity }],
    });
  } else {
    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }
  }

  await cart.save();
  
  // Find the added/updated product in the cart to return
  const addedProduct = cart.products.find(p => p.productId.toString() === productId);
  
  // Populate the product details to return
  const populatedCart = await Cart.findOne({ userId })
    .populate({
      path: 'products.productId',
      model: 'Product'
    });
  
  const productDetails = populatedCart.products.find(p => p.productId._id.toString() === productId);
  
  res.json({ product: productDetails.productId, quantity: productDetails.quantity });
};

// 📥 Get Cart
const getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id }).populate(
    "products.productId"
  );

  res.json(cart ? cart.products : []);
};

// ❌ Remove from Cart
const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ userId: req.user.id });

  if (!cart) return res.status(404).json({ msg: "Cart not found" });

  cart.products = cart.products.filter(
    (p) => p.productId.toString() !== productId
  );

  await cart.save();
  res.json(cart);
};

// 🧹 Clear Cart
const clearCart = async (req, res) => {
  await Cart.findOneAndDelete({ userId: req.user.id });
  res.json({ msg: "Cart cleared" });
};

// 📈 Update Cart Item Quantity
const updateQuantity = async (req, res) => {
  const { productId } = req.params;
  const { change } = req.body; // change can be +1 or -1
  const userId = req.user.id;
  
  try {
    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }
    
    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );
    
    if (productIndex === -1) {
      return res.status(404).json({ msg: "Product not found in cart" });
    }
    
    // Update quantity, ensuring it doesn't go below 1
    cart.products[productIndex].quantity = Math.max(1, cart.products[productIndex].quantity + change);
    
    // If quantity becomes 0 or less, remove the item
    if (cart.products[productIndex].quantity <= 0) {
      cart.products.splice(productIndex, 1);
    }
    
    await cart.save();
    
    res.json({ msg: "Quantity updated" });
  } catch (error) {
    console.error('Error updating quantity:', error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
  updateQuantity,
};
