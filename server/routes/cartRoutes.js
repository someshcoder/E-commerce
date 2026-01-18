const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
  updateQuantity,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

// Add product to cart
router.post("/add", protect, addToCart);

// Get logged-in user's cart
router.get("/", protect, getCart);

// Update cart item quantity
router.put("/:productId/quantity", protect, updateQuantity);

// Remove single product from cart
router.delete("/remove/:productId", protect, removeFromCart);

// Clear entire cart
router.delete("/clear", protect, clearCart);

module.exports = router;
