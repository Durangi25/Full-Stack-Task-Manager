const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tasks = [
  {
    id: 1,
    title: "Complete frontend design",
    completed: false
  },
  {
    id: 2,
    title: "Connect frontend with backend API",
    completed: false
  }
];

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Full Stack Task Manager API is running successfully"
  });
});

// GET all tasks
app.get("/api/tasks", (req, res) => {
  res.status(200).json({
    success: true,
    data: tasks
  });
});

// POST create new task
app.post("/api/tasks", (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Task title is required"
    });
  }

  const newTask = {
    id: Date.now(),
    title: title.trim(),
    completed: false
  };

  tasks.push(newTask);

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: newTask
  });
});

// PATCH update task status
app.patch("/api/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);

  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found"
    });
  }

  task.completed = !task.completed;

  res.status(200).json({
    success: true,
    message: "Task status updated successfully",
    data: task
  });
});

// DELETE task
app.delete("/api/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);

  const existingTask = tasks.find((item) => item.id === taskId);

  if (!existingTask) {
    return res.status(404).json({
      success: false,
      message: "Task not found"
    });
  }

  tasks = tasks.filter((item) => item.id !== taskId);

  res.status(200).json({
    success: true,
    message: "Task deleted successfully"
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});