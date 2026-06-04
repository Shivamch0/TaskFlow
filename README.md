# TaskFlow

TaskFlow is a full-stack project management app for organizing projects, tasks, and subtasks. It includes cookie-based authentication, protected dashboard routes, project progress tracking, task priorities, due dates, dark mode, profile settings, and analytics-style dashboard views.

## Tech Stack

**Frontend**

- React 19
- Vite 8
- React Router 7
- Tailwind CSS 4
- Axios
- Formik and Yup
- Lucide React icons

**Backend**

- Node.js
- Express 5
- MongoDB with Mongoose
- JSON Web Tokens
- bcrypt
- cookie-parser
- CORS

## Project Structure

```text
TaskFlow/
  Backend/
    src/
      app.js
      server.js
      config/
        database.js
      controller/
      helpers/
      middlewares/
      model/
      routes/
      utils/
  Frontend/
    src/
      axios/
      components/
      context/
      layouts/
      pages/
      routes/
```

## Features

- User registration, login, logout, profile update, and session check
- Protected dashboard routes
- Create, update, delete, search, and filter projects
- Create, update, delete, search, and filter tasks
- Create, update, delete, and toggle subtasks
- Project progress calculation from tasks/subtasks
- Dashboard statistics and analytics pages
- Light/dark theme support
- Responsive SaaS-style UI

## Environment Variables

Create `Backend/.env`:

```env
PORT=5000
MONGODB_URL=mongodb://127.0.0.1:27017
CORS=http://localhost:5173
NODE_ENV=development
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=7d
```

Create `Frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
```

## Installation

Install backend dependencies:

```bash
cd Backend
npm install
```

Install frontend dependencies:

```bash
cd Frontend
npm install
```

## Running Locally

Start the backend:

```bash
cd Backend
npm run dev
```

Start the frontend:

```bash
cd Frontend
npm run dev
```

The frontend usually runs at:

```text
http://localhost:5173
```

The backend usually runs at:

```text
http://localhost:5000
```

## Build

Build the frontend for production:

```bash
cd Frontend
npm run build
```

Preview the production build:

```bash
cd Frontend
npm run preview
```

The backend does not currently have a build step. It runs directly with Node:

```bash
cd Backend
npm start
```

## API Overview

Base URL:

```text
/api/v1
```

### Auth

```text
POST  /user/register
POST  /user/login
POST  /user/logout
POST  /user/refresh-token
GET   /user/current-user
PATCH /user/update-profile
```

### Projects

```text
POST   /project
GET    /project
GET    /project/:id
PATCH  /project/:id
DELETE /project/:id
```

### Tasks

```text
POST   /task/project/:projectId
GET    /task/project/:projectId
GET    /task/:taskId
PATCH  /task/:taskId
DELETE /task/:taskId
PATCH  /task/:taskId/toggle-status
```

### Subtasks

```text
POST   /subTask/task/:taskId
GET    /subTask/task/:taskId
GET    /subTask/:subTaskId
PATCH  /subTask/:subTaskId
DELETE /subTask/:subTaskId
PATCH  /subTask/:subTaskId/toggle-status
```

## Current Build Status

Frontend production build passes:

```text
vite build
1958 modules transformed
dist/index.html                 0.95 kB
dist/assets/index-*.css        63.11 kB
dist/assets/index-*.js        532.05 kB
```

## Improvement Backlog

- Add automated tests for auth, project ownership, task/subtask CRUD, and progress calculation.
- Add stricter backend request validation for field lengths, allowed values, and dates.
- Add user-facing frontend error states for failed project/task/subtask actions.
- Consider extracting project, task, and subtask API calls into dedicated service modules if the contexts keep growing.
- Add pagination or aggregation endpoints if project lists become large.
