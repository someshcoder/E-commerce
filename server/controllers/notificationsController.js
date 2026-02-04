const Notification = require('../models/Notification');
const User = require('../models/User');

// @desc    Create a new notification
// @route   POST /api/notifications/create
// @access  Private
const createNotification = async (req, res) => {
  try {
    const { title, message, type, priority, recipientType } = req.body;

    // If recipientType is 'admin', find all admin users
    if (recipientType === 'admin') {
      const adminUsers = await User.find({ isAdmin: true });
      
      if (adminUsers.length === 0) {
        return res.status(404).json({ message: 'No admin users found' });
      }

      // Create notification for each admin user
      const notifications = [];
      for (const admin of adminUsers) {
        const notification = new Notification({
          userId: admin._id,
          title,
          message,
          type: type || 'info',
          priority: priority || 'medium',
          recipientType: 'admin'
        });
        
        await notification.save();
        notifications.push(notification);
      }

      return res.status(201).json({
        message: 'Notifications created for all admins',
        notifications
      });
    } else {
      // For regular users, create notification for the authenticated user
      const notification = new Notification({
        userId: req.user._id,
        title,
        message,
        type: type || 'info',
        priority: priority || 'medium',
        recipientType: recipientType || 'user'
      });

      await notification.save();

      res.status(201).json({
        message: 'Notification created successfully',
        notification
      });
    }
  } catch (error) {
    console.error('Create notification error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get user notifications
// @route   GET /api/notifications
// @access  Private
const getUserNotifications = async (req, res) => {
  try {
    // Allow all users to access their own newsletter notifications
    // Only fetch newsletter notifications for the current user
    const notifications = await Notification.find({ 
      userId: req.user._id,
      type: 'newsletter' // Only fetch newsletter notifications
    })
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json(notifications);
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.isRead = true;
    await notification.save();

    res.status(200).json({
      message: 'Notification marked as read',
      notification
    });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete notification
// @route   DELETE /api/notifications/:id
// @access  Private
const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    await notification.remove();

    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createNotification,
  getUserNotifications,
  markAsRead,
  deleteNotification
};