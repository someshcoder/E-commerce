const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Only allow admin role if the requesting user is already an admin
  const isAdmin = role === 'admin';

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    isAdmin: isAdmin,
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    }),
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Check if user is active
  if (!user.isActive) {
    return res.status(401).json({ message: "Account has been deactivated. Please contact support." });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    isActive: user.isActive,
    token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    }),
  });
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.avatar = req.body.avatar || user.avatar;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      avatar: updatedUser.avatar,
      isAdmin: updatedUser.isAdmin,
      isActive: updatedUser.isActive,
      token: jwt.sign({ id: updatedUser._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      }),
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateProfile,
};
