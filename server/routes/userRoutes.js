const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
router.get("/", protect, async (req, res) => {
  try {
    // Check if the requesting user is an admin
    if (!req.user.isAdmin) {
      return res.status(401).json({ message: "Not authorized as admin" });
    }

    // Fetch all users except passwords
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get user by ID (admin only)
// @route   GET /api/users/:id
// @access  Private/Admin
router.get("/:id", protect, async (req, res) => {
  try {
    // Check if the requesting user is an admin
    if (!req.user.isAdmin) {
      return res.status(401).json({ message: "Not authorized as admin" });
    }

    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Block a user (admin only)
// @route   PUT /api/users/:id/block
// @access  Private/Admin
router.put('/:id/block', protect, async (req, res) => {
  try {
    // Check if the requesting user is an admin
    if (!req.user.isAdmin) {
      return res.status(401).json({ message: "Not authorized as admin" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User blocked successfully',
      user
    });
  } catch (error) {
    console.error('Error blocking user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Unblock a user (admin only)
// @route   PUT /api/users/:id/unblock
// @access  Private/Admin
router.put('/:id/unblock', protect, async (req, res) => {
  try {
    // Check if the requesting user is an admin
    if (!req.user.isAdmin) {
      return res.status(401).json({ message: "Not authorized as admin" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: true },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User unblocked successfully',
      user
    });
  } catch (error) {
    console.error('Error unblocking user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;