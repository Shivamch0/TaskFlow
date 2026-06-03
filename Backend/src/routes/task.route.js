import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import { createTask, getTasks, getTaskById, updateTask, deleteTask, toggleTaskStatus } from "../controller/task.controller.js";

const router = Router();

router.route("/project/:projectId")
  .post(verifyJWT, createTask)
  .get(verifyJWT, getTasks);

router.route("/:taskId")
  .get(verifyJWT, getTaskById)
  .patch(verifyJWT, updateTask)
  .delete(verifyJWT, deleteTask);


router.route("/:taskId/toggle-status").patch(verifyJWT, toggleTaskStatus);

export default router;
