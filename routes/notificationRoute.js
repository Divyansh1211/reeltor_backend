const express = require('express');
const { sendNotification, getUserNotifications } = require('../controller/notification');
const { checkAuthUser } = require('../middlewares/checkAuth');
const notificationRouter = express.Router();

notificationRouter.post('/send',checkAuthUser, sendNotification);
notificationRouter.get('/:userId',checkAuthUser, getUserNotifications);

module.exports = notificationRouter;