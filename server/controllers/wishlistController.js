const User = require("../models/User");

// ➕ Add to Wishlist
const addToWishlist = async (req, res) => {
  const { productId } = req.body;

  const user = await User.findById(req.user.id);

  if (!user.wishlist) user.wishlist = [];

  if (!user.wishlist.includes(productId)) {
    user.wishlist.push(productId);
  }

  await user.save();
  
  // Populate and return the full wishlist with product details
  const populatedUser = await User.findById(req.user.id).populate('wishlist');
  res.json(populatedUser.wishlist);
};

// 📥 Get Wishlist
const getWishlist = async (req, res) => {
  const user = await User.findById(req.user.id).populate("wishlist");
  res.json(user.wishlist || []);
};

// ❌ Remove from Wishlist
const removeFromWishlist = async (req, res) => {
  const { productId } = req.params;

  const user = await User.findById(req.user.id);

  user.wishlist = user.wishlist.filter(
    (id) => id.toString() !== productId
  );

  await user.save();
  res.json(user.wishlist);
};

// 🗑️ Clear Wishlist
const clearWishlist = async (req, res) => {
  const user = await User.findById(req.user.id);
  
  user.wishlist = [];
  
  await user.save();
  res.json({ message: 'Wishlist cleared successfully' });
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  clearWishlist,
};
