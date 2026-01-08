const express = require("express");
const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

const protect = require("../middleware/authMiddleware");

// Add to wishlist
router.post("/add", protect, addToWishlist);

// Get wishlist
router.get("/", protect, getWishlist);

// Remove from wishlist
router.delete("/remove/:productId", protect, removeFromWishlist);

module.exports = router;
