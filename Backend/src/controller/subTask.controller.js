import { SubTask } from "../model/subtask.model.js";
import { Task } from "../model/task.model.js";

import { validateTask } from "../helpers/task.helper.js";
import { validateSubTask } from "../helpers/subTask.helper.js";

// ? Utils Import
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createSubTask = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (!title) {
    throw new ApiError(400, "SubTasktitle is required...");
  }

  const task = await validateTask(req.params.taskId, req.user._id);

  const subTask = await SubTask.create({
    title,
    task: task.id,
  });

  if (task.completed) {
    task.completed = false;
    await task.save();
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { subTask }, "SubTask created successfully..."));
});

const getSubTasksByTask = asyncHandler(async (req, res) => {
  if (!req.params.taskId) {
    throw new ApiError(404, "Task Id not found...");
  }
  const task = await validateTask(req.params.taskId, req.user._id);

  const fetchSubTasks = await SubTask.find({ task: task._id }).sort({
    createdAt: -1,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { fetchSubTasks },
        "SubTasks fetched successfully...",
      ),
    );
});

const getSubTaskById = asyncHandler(async (req, res) => {
  if (!req.params.subTaskId) {
    throw new ApiError(404, "SubTask Id not found...");
  }
  const subTask = await validateSubTask(req.params.subTaskId, req.user._id);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { subTask },
        "SubTask fetched By Id successfully...",
      ),
    );
});

const updateSubTask = asyncHandler(async (req, res) => {
  if (!req.params.subTaskId) {
    throw new ApiError(404, "Task Id not found...");
  }
  const subTask = await validateSubTask(req.params.subTaskId, req.user._id);
  const { title } = req.body;
  if (!title) {
    throw new ApiError(404, "Title is required for Updation...");
  }

  const updatedSubTask = await SubTask.findByIdAndUpdate(
    subTask._id,
    {
      $set: {
        title,
      },
    },
    {
      new: true,
    },
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { updatedSubTask },
        "SubTask updated successfully...",
      ),
    );
});

const deleteSubTask = asyncHandler(async (req, res) => {
  if (!req.params.subTaskId) {
    throw new ApiError(404, "Task Id not found...");
  }
  const subTask = await validateSubTask(req.params.subTaskId, req.user._id);

  const deletedSubTask = await SubTask.findByIdAndDelete(subTask._id);
  const remainingSubTasks = await SubTask.find({ task: subTask.task });
  const allCompleted =
    remainingSubTasks.length > 0 && remainingSubTasks.every((item) => item.completed);

  await Task.findByIdAndUpdate(subTask.task, { $set: { completed: allCompleted } });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { deletedSubTask },
        "SubTask deleted successfully...",
      ),
    );
});

const toggleSubTaskStatus = asyncHandler(async (req, res) => {
  if (!req.params.subTaskId) {
    throw new ApiError(404, "Task Id not found...");
  }
  const subTask = await validateSubTask(req.params.subTaskId, req.user._id);

  subTask.completed = !subTask.completed;
  await subTask.save();

  const subTasks = await SubTask.find({ task: subTask.task });
  const allCompleted = subTasks.length > 0 && subTasks.every((item) => item.completed);
  await Task.findByIdAndUpdate(subTask.task, { $set: { completed: allCompleted } });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        subTask,
        `Task marked as ${subTask.completed ? "completed" : "pending"}`,
      ),
    );
});

export {
  createSubTask,
  getSubTasksByTask,
  getSubTaskById,
  updateSubTask,
  deleteSubTask,
  toggleSubTaskStatus,
};
