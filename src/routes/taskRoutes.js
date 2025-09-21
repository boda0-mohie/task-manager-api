const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/taskController");

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.delete("/:id", authMiddleware, deleteTask)
router.put("/:id", authMiddleware, updateTask);

module.exports = router;
