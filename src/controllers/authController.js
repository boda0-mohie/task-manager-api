const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { successResponse, errorResponse } = require('../utils/response');

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return errorResponse(res, "All fields are required", 400);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, "Email already exists", 400);
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return successResponse(res, {
      message: "User registered successfully",
      token
    }, 201);

  } catch (err) {
    console.error(err);
    return errorResponse(res, "Server error", 500);
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, "All fields are required", 400);
    }

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, "Invalid credentials", 401);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return errorResponse(res, "Invalid credentials", 401);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return successResponse(res, {
      message: "Logged in successfully",
      token
    });

  } catch (err) {
    console.error(err);
    return errorResponse(res, "Server error", 500);
  }
};
