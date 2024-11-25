import express from 'express';
import NotificationController from '../Controllers/NotificationController.js';

const router = express.Router();

// Route to create a new notification
router.post('/', NotificationController.createNotification);

//route to get all notifications
router.get('/', NotificationController.getAllNotifications);

// Route to get notifications for a user
router.get('/notifications/:userId', NotificationController.getNotifications);

// Route to mark a notification as read
router.patch('/notifications/:notificationId/read', NotificationController.markAsRead);

export default router;
