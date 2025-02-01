const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  recipients: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  message: String,
  type: {
    type: String,
    enum: ["critical", "non-critical"],
    default: "non-critical",
  },
  status: { type: String, enum: ["delivered", "queued"], default: "delivered" },
  sentAt: { type: Date, default: Date.now },
  deliveredAt: { type: Date },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
