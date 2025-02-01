const express = require("express");
const {
  getUsers,
  signUpUser,
  signInUser,
  updateUser,
} = require("../controller/user");
const {  checkAuthUser, checkAuthAdmin } = require("../middlewares/checkAuth");
const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/signup", signUpUser);
userRouter.post("/signin", signInUser);
userRouter.post("/update",checkAuthUser, updateUser);

module.exports = userRouter;
