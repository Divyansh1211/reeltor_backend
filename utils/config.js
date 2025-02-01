require("dotenv").config();

const jwt_secret = process.env.JWT_SECRET;
const mongodb_uri = process.env.MONGO_URI;

module.exports = { jwt_secret, mongodb_uri };
