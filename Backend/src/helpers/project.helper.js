import { Project } from "../model/project.model.js";
import { ApiError } from "../utils/ApiError.js";
import { validateObjectId } from "../utils/validateObjectId.js";

export const validateProject = async (projectId, userId) => {
  validateObjectId(projectId, "Project Id");

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found...");
  }

  if (project.user.toString() !== userId.toString()) {
    throw new ApiError(403, "Unauthorized...");
  }

  return project;
};
