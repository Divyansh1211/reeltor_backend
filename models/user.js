const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    // required: [true, "User must have a name"],
  },
  mobileNumber: {
    type: String,
    // required: [true, "User must have a mobile number"],
    // unique: true,
  },
  email: {
    type: String,
    required: [true, "User must have an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  bio: {
    type: String,
  },
  availabilityTime: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
