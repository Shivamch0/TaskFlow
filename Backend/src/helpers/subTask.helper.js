import { SubTask } from "../model/subtask.model.js";
import { Task } from "../model/task.model.js";
import { Project } from "../model/project.model.js";
import { ApiError } from "../utils/ApiError.js";
import { validateObjectId } from "../utils/validateObjectId.js";

export const validateSubTask = async (subTaskId, userId) => {
    validateObjectId(subTaskId, "SubTask Id");

    const subTask = await SubTask.findById(subTaskId);

    if (!subTask) {
        throw new ApiError(404, "SubTask not found...");
    }

    const task = await Task.findById(subTask.task);

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

    return subTask;
};
