const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  updateOrderStatus,
  getAdminStats
} = require("../controllers/orderController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Get all orders (admin only)
router.get("/orders", protect, adminOnly, getAllOrders);

// Update order status (admin only)
router.put("/orders/:id/status", protect, adminOnly, updateOrderStatus);

// Get admin statistics
router.get("/stats", protect, adminOnly, getAdminStats);

module.exports = router;