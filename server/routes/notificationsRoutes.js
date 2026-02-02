const express = require('express');
const router = express.Router();
const { createNotification, getUserNotifications, markAsRead, deleteNotification } = require('../controllers/notificationsController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getUserNotifications).post(protect, createNotification);
router.route('/:id/read').put(protect, markAsRead);
router.route('/:id').delete(protect, deleteNotification);

module.exports = router;