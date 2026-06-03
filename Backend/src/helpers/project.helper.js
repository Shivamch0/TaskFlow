import { Project } from "../model/project.model.js";
import { ApiError } from "../utils/ApiError.js";

export const validateProject = async (projectId, userId) => {
  if (!projectId) {
    throw new ApiError(404, "Project Id not found...");
  }

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found...");
  }

  if (project.user.toString() !== userId.toString()) {
    throw new ApiError(403, "Unauthorized...");
  }

  return project;
};
