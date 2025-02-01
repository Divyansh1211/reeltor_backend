const express = require("express");
const app = express();
const port = 3000;
const userRouter = require("./routes/userRoute");
const mongoose = require("mongoose");
const cron = require("node-cron");
const Notification = require("./models/notification");
const User = require("./models/user");
const { isUserAvailable } = require("./utils/helper");
const notificationRouter = require("./routes/notificationRoute");
const { mongodb_uri } = require("./utils/config");

mongoose.connect(mongodb_uri).then(() => {
  console.log("Connected to database");
});

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/notification", notificationRouter);

app.get("/", (req, res) => {
  res.send("ping pong!");
});

cron.schedule("*/10 * * * *", async () => {
  console.log("Checking for queued notifications...");
  const queuedNotifications = await Notification.find({ status: "queued" });

  for (let notification of queuedNotifications) {
    let user = await User.findById(notification.recipients[0]);

    if (isUserAvailable(user.availabilityTime)) {
      notification.status = "delivered";
      notification.deliveredAt = new Date();
      await notification.save();
    }
  }

  console.log("Notification queue processed.");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
