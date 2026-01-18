const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getOrderById,
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");

// Place new order
router.post("/create", protect, createOrder);

// Get logged-in user's orders
router.get("/my-orders", protect, getMyOrders);

// Get single order details
router.get("/:id", protect, getOrderById);

module.exports = router;
