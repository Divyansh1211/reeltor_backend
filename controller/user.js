const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { jwt_secret } = require("../utils/config");
const {
  signUpUserValidator,
  updateUserValidator,
} = require("../schemaValidator/user");

const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

const signUpUser = async (req, res) => {
  const { email, password, role } = req.body;
  const schemaValidator = signUpUserValidator.safeParse(req.body);
  if (schemaValidator.success) {
    const user = await User.findOne({ email: email });
    if (user) {
      res.status(400).json("User already exists");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        email: email,
        role: role !== null ? role : null,
        password: hashedPassword,
      });
      res
        .status(201)
        .json({ success: true, message: "user created successfully" });
    }
  } else {
    res.status(400).json(schemaValidator.error);
  }
};

const signInUser = async (req, res) => {
  const { email, password } = req.body;
  const schemaValidator = signUpUserValidator.safeParse(req.body);
  if (schemaValidator.success) {
    const user = await User.findOne({ email: email });
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
        const token = jwt.sign({ id: user._id, role: user.role }, jwt_secret);
        res.status(200).json({ success: true, token: token });
      } else {
        res.status(400).json("Invalid credentials");
      }
    } else {
      res.status(400).json("User not found");
    }
  } else {
    res.status(400).json(schemaValidator.error);
  }
};

const updateUser = async (req, res) => {
  const { bio, mobileNumber, availabilityTime, name } = req.body;
  const schemaValidator = updateUserValidator.safeParse(req.body);
  if (schemaValidator.success) {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (user) {
      await User.findByIdAndUpdate(userId, {
        userName: name !== null ? name : user.userName,
        bio: bio !== null ? bio : user.bio,
        mobileNumber: mobileNumber !== null ? mobileNumber : user.mobileNumber,
        availabilityTime:
          availabilityTime !== null ? availabilityTime : user.availabilityTime,
      });
      res
        .status(200)
        .json({ success: true, message: "User updated successfully" });
    } else {
      res.status(404).json("User not found");
    }
  } else {
    res.status(400).json(schemaValidator.error);
  }
};

module.exports = { getUsers, signUpUser, signInUser, updateUser };
