const API_URL = "http://localhost:5000/api/tasks";

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const message = document.getElementById("message");

function showMessage(text, type) {
  message.textContent = text;
  message.className = `message ${type}`;

  setTimeout(() => {
    message.textContent = "";
    message.className = "message";
  }, 3000);
}

async function fetchTasks() {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch tasks");
    }

    displayTasks(result.data);
  } catch (error) {
    showMessage(error.message, "error");
  }
}

function displayTasks(tasks) {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.innerHTML = `<p class="empty">No tasks available. Add your first task.</p>`;
    return;
  }

  tasks.forEach((task) => {
    const taskCard = document.createElement("div");
    taskCard.className = task.completed ? "task-card completed" : "task-card";

    taskCard.innerHTML = `
      <span class="task-title">${task.title}</span>
      <div class="actions">
        <button class="complete-btn" onclick="toggleTask(${task.id})">
          ${task.completed ? "Undo" : "Complete"}
        </button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">
          Delete
        </button>
      </div>
    `;

    taskList.appendChild(taskCard);
  });
}

async function addTask() {
  const title = taskInput.value.trim();

  if (!title) {
    showMessage("Please enter a task title", "error");
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to add task");
    }

    taskInput.value = "";
    showMessage(result.message, "success");
    fetchTasks();
  } catch (error) {
    showMessage(error.message, "error");
  }
}

async function toggleTask(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH"
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to update task");
    }

    showMessage(result.message, "success");
    fetchTasks();
  } catch (error) {
    showMessage(error.message, "error");
  }
}

async function deleteTask(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to delete task");
    }

    showMessage(result.message, "success");
    fetchTasks();
  } catch (error) {
    showMessage(error.message, "error");
  }
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

fetchTasks();