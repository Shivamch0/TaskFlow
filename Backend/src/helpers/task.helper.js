import { Task } from "../model/task.model.js";
import { Project } from "../model/project.model.js";
import { ApiError } from "../utils/ApiError.js";
import { validateObjectId } from "../utils/validateObjectId.js";

export const validateTask = async (taskId, userId) => {
  validateObjectId(taskId, "Task Id");

  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found...");
  }

  const project = await Project.findById(task.project);

  if (!project) {
    throw new ApiError(404, "Project not found...");
  }

  if (project.user.toString() !== userId.toString()) {
    throw new ApiError(403, "Unauthorized...");
  }

  return task;
};
