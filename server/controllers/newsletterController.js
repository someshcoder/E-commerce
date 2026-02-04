const User = require('../models/User');
const Notification = require('../models/Notification');

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
// @access  Public
const subscribeToNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Find the user by email to get their ID
    const user = await User.findOne({ email });
    
    if (user) {
      // Create notification for the user who subscribed
      const userNotification = new Notification({
        userId: user._id,
        title: 'Newsletter Subscription Successful',
        message: `You have successfully subscribed to our newsletter with email: ${email}`,
        type: 'newsletter',
        priority: 'medium',
        recipientType: 'user'
      });
      
      await userNotification.save();
    } else {
      // If user doesn't exist in the system, we could create a notification for newsletter signups
      // For now, we'll just log that a guest subscribed
      console.log(`Guest with email ${email} subscribed to newsletter`);
    }
    
    // In a real application, you would typically store newsletter subscriptions in a separate collection
    // For now, we'll return success
    
    res.status(200).json({ 
      message: 'Successfully subscribed to newsletter',
      email 
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  subscribeToNewsletter
};