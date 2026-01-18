const express = require("express");
const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  clearWishlist,
} = require("../controllers/wishlistController");

const { protect } = require("../middleware/authMiddleware");

// Add to wishlist
router.post("/add", protect, addToWishlist);

// Get wishlist
router.get("/", protect, getWishlist);

// Remove from wishlist
router.delete("/remove/:productId", protect, removeFromWishlist);
router.delete("/clear", protect, clearWishlist);

module.exports = router;
