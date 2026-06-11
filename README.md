# Full Stack Task Manager

A full-stack task management web application built to demonstrate frontend and backend integration using REST APIs. The project allows users to add tasks, view task lists, mark tasks as complete or incomplete and delete tasks through a dynamic user interface connected to a backend API.

## Project Overview

This project focuses on connecting a frontend user interface with a backend server using asynchronous API requests. The frontend communicates with the backend using the Fetch API and async/await, while the backend handles REST API operations using Node.js and Express.js.

The application demonstrates the complete input-process-output flow of a modern full-stack web application:

- Frontend collects user input
- Backend processes API requests
- Backend sends JSON responses
- Frontend dynamically updates the UI

## Features

- Add new tasks
- View all tasks dynamically
- Mark tasks as completed
- Undo completed tasks
- Delete tasks
- REST API integration
- JSON-based request and response handling
- Basic error handling using try/catch
- CORS-enabled frontend-backend communication
- Responsive and clean user interface

## Technologies Used

### Frontend
- HTML
- CSS
- JavaScript
- Fetch API
- Async/Await

### Backend
- Node.js
- Express.js
- CORS
- REST API

## REST API Endpoints

| Method | Endpoint | Description |
|------|----------|-------------|
| GET | `/api/tasks` | Fetch all tasks |
| POST | `/api/tasks` | Add a new task |
| PATCH | `/api/tasks/:id` | Update task completion status |
| DELETE | `/api/tasks/:id` | Delete a task |
