const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { errorResponse } = require("../utils/response");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if token exists and formatted correctly
    if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
      return errorResponse(res, "No token, authorization denied", 401);
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from DB
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return errorResponse(res, "User not found, authorization denied", 401);
    }

    req.user = user;
    next();

  } catch (err) {
    console.error("Auth Error:", err.message);

    if (err.name === "TokenExpiredError") {
      return errorResponse(res, "Token expired", 401);
    }

    return errorResponse(res, "Invalid token", 401);
  }
};

module.exports = authMiddleware;
