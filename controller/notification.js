const User = require("../models/user");
const Notification = require("../models/notification");
const { isUserAvailable } = require("../utils/helper");

const sendNotification = async (req, res) => {
  try {
    const { recipientIds, message, type } = req.body;
    const senderId = req.user.id;
    const role = req.user.role;
    const recipients = await User.find({ _id: { $in: recipientIds } });
    let notifications = [];
    for (let user of recipients) {
      let status = "queued";
      let deliveredAt = null;
      if (role === "user") {
        if (isUserAvailable(user.availabilityTime)) {
          status = "delivered";
          deliveredAt = new Date();
        }
      } else {
        if (type === "critical" || isUserAvailable(user.availabilityTime)) {
          status = "delivered";
          deliveredAt = new Date();
        }
      }
      notifications.push({
        sender: senderId,
        recipients: [user._id],
        message,
        type,
        status,
        deliveredAt,
      });
    }
    const savedNotifications = await Notification.insertMany(notifications);
    return res
      .status(200)
      .json({ message: "Notifications processed", data: savedNotifications });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// const processQueuedNotifications = async (req, res) => {
//   try {
//     const queuedNotifications = await Notification.find({
//       status: "queued",
//     });

//     let updatedNotifications = [];

//     for (let notification of queuedNotifications) {
//       let user = await User.findById(notification.recipients[0]);

//       if (isUserAvailable(user.availabilityTime)) {
//         notification.status = "delivered";
//         notification.deliveredAt = new Date();
//         updatedNotifications.push(notification);
//       }
//     }

//     await Notification.bulkSave(updatedNotifications);

//     return res.status(200).json({ message: "Queued notifications processed" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await Notification.find({
      recipients: userId,
    }).sort({ sentAt: -1 });

    return res.status(200).json({ data: notifications });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { sendNotification, getUserNotifications };
