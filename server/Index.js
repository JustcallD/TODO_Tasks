const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(bodyParser.json());

// cors
const cors = require("cors");
app.use(cors());

// dotenv
const dotenv = require("dotenv");
dotenv.config();

// database connection
const mongoose = require("mongoose");
require("./DataBase/ConnectDB");
// Import task routes
const Task = require("./Models/Task");

// Create a new task
app.post("/api/tasks", async (req, res) => {
  const { title, description } = req.body;
  const newTask = new Task({
    title,
    description,
    status: false,
  });

  try {
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ error: "Failed to create task." });
  }
});

// Get all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to get tasks." });
  }
});

// Update a task
app.put("/api/tasks/:id", async (req, res) => {
  const taskId = req.params.id;
  const { title, description, status } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, status },
      { new: true }
    );
    res.status(200).json({ message: "Task updated successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update task." });
  }
});

// Delete a task
app.delete("/api/tasks/:id", async (req, res) => {
  const taskId = req.params.id;

  try {
    await Task.findByIdAndRemove(taskId);
    res.status(200).json({ message: "Task deleted successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete task." });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});
