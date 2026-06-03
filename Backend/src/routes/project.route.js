import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createProject,
  getProjectById,
  getProjects,
  updateProject,
  deleteProject,
} from "../controller/project.controller.js";

const router = Router();

router.route("/")
    .post(verifyJWT, createProject)
    .get(verifyJWT, getProjects)

router
  .route("/:id")
  .get(verifyJWT, getProjectById)
  .patch(verifyJWT, updateProject)
  .delete(verifyJWT, deleteProject);

export default router;
