const Task = require("../models/Task");
const { successResponse, errorResponse } = require("../utils/response");

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return errorResponse(res, "Title is required", 400);
    }

    const task = await Task.create({
      title,
      description,
      user: req.user._id,
    });

    return successResponse(res, task, 201);
  } catch (err) {
    console.error(err);
    return errorResponse(res, "Server error", 500);
  }
};

// Get User's Tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    return successResponse(res, tasks, 200);
  } catch (err) {
    console.error(err);
    return errorResponse(res, "Server error", 500);
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate status if provided
    const allowedStatuses = ["pending", "in-progress", "done"];
    if (req.body.status && !allowedStatuses.includes(req.body.status)) {
      return errorResponse(res, "Invalid status value", 400);
    }

    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return errorResponse(res, "Task not found", 404);
    }
    
    return successResponse(res, task, 200);
  } catch (err) {
    console.error(err);
    return errorResponse(res, "Server error", 500);
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });

    if (!task) {
      return errorResponse(res, "Task not found", 404);
    }

    return successResponse(res, { message: "Task deleted successfully" }, 200);
  } catch (err) {
    console.error(err);
    return errorResponse(res, "Server error", 500);
  }
};
