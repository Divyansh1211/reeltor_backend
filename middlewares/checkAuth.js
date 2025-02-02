const { jwt_secret } = require("../utils/config");
const jwt = require("jsonwebtoken");

const checkAuthUser = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token.startsWith("Bearer ")) {
    const authToken = token.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    } else {
      try {
        const decoded = await jwt.verify(authToken, jwt_secret);
        req.user = decoded;
        next();
      } catch (error) {
        return res.status(401).json({
          status: "error",
          message: error.message,
        });
      }
    }
  } else {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized",
    });
  }
};

const checkAuthAdmin = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token.startsWith("Bearer ")) {
    const authToken = token.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    } else {
      try {
        const decoded = await jwt.verify(authToken, jwt_secret);
        if (decoded.role === "admin") {
          req.user = decoded;
          next();
        } else {
          return res.status(401).json({
            status: "error",
            message: "Unauthorized",
          });
        }
      } catch (error) {
        return res.status(401).json({
          status: "error",
          message: error.message,
        });
      }
    }
  } else {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized",
    });
  }
};

module.exports = { checkAuthUser, checkAuthAdmin };
