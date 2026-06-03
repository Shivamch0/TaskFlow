import { Task } from "../model/task.model.js";

//! Helper Imports
import { validateProject } from "../helpers/project.helper.js";
import { validateTask } from "../helpers/task.helper.js";

// ? Utils Import
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createTask = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (!title) {
    throw new ApiError(400, "Task cannot be empty...");
  }

  const project = await validateProject(req.params.projectId, req.user._id);

  const task = await Task.create({
    title,
    project: project._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { task }, "Task Created Successfully..."));
});

const getTasks = asyncHandler(async (req, res) => {
  const project = await validateProject(req.params.projectId, req.user._id);

  const fetchTasks = await Task.find({ project: project._id }).sort({
    createdAt: -1,
  });
  return res
    .status(200)
    .json(
      new ApiResponse(200, { fetchTasks }, "Tasks Fetched Successfully..."),
    );
});

const getTaskById = asyncHandler(async (req, res) => {
  const taskId = req.params.taskId;
  if (!taskId) {
    throw new ApiError(404, "Task Id not found...");
  }

  const task = await validateTask(taskId, req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, { task }, "Task fetched by id successfully..."));
});

const updateTask = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (!title) {
    throw new ApiError(400, "Task title is required...");
  }
  const taskId = req.params.taskId;
  if (!taskId) {
    throw new ApiError(404, "Task Id not found...");
  }

  const task = await validateTask(taskId, req.user._id);

  const updatedTask = await Task.findByIdAndUpdate(
    task._id,
    {
      $set: {
        title,
      },
    },
    { new: true },
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, { updatedTask }, "Task Updated Successfully..."),
    );
});

const deleteTask = asyncHandler(async (req, res) => {
  const taskId = req.params.taskId;
  if (!taskId) {
    throw new ApiError(404, "Task Id not found...");
  }

  const task = await validateTask(taskId, req.user._id);

  await Task.findByIdAndDelete(task._id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Task deleted  successfully..."));
});

const toggleTaskStatus = asyncHandler(async (req, res) => {
  const taskId = req.params.taskId;
  if (!taskId) {
    throw new ApiError(404, "Task Id not found...");
  }

  const task = await validateTask(taskId, req.user._id);

  task.completed = !task.completed;
  await task.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        task,
        `Task marked as ${task.completed ? "completed" : "pending"}`,
      ),
    );
});

export {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  toggleTaskStatus,
};
