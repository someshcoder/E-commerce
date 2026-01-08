const Order = require("../models/Order");
const Cart = require("../models/Cart");

// 🛍️ Create Order
const createOrder = async (req, res) => {
  const userId = req.user.id;
  const { address, paymentMethod } = req.body;

  const cart = await Cart.findOne({ userId });

  if (!cart || cart.products.length === 0) {
    return res.status(400).json({ msg: "Cart is empty" });
  }

  const order = new Order({
    userId,
    products: cart.products,
    address,
    paymentMethod,
    status: "Placed",
  });

  await order.save();
  await Cart.findOneAndDelete({ userId });

  res.status(201).json(order);
};

// 📜 Get My Orders
const getMyOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.id }).populate(
    "products.productId"
  );
  res.json(orders);
};

// 🔍 Get Order by ID
const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "products.productId"
  );

  if (!order) return res.status(404).json({ msg: "Order not found" });

  res.json(order);
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
};
