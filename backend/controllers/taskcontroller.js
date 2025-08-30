const Task = require("../models/taskmodel");

// @desc    Get all tasks for logged-in user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });

    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (err) {
    console.error("Error fetching tasks:", err.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching tasks"
    });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Task title is required"
      });
    }

    const task = new Task({
      title,
      user: req.user.id
    });

    await task.save();

    return res.status(201).json({
      success: true,
      data: task
    });
  } catch (err) {
    console.error("Error creating task:", err.message);
    return res.status(500).json({
      success: false,
      message: "Server error while creating task"
    });
  }
};

module.exports = { getTasks, createTask };
