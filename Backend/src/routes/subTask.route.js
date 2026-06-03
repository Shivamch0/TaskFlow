import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createSubTask,
  getSubTaskById,
  getSubTasksByTask,
  updateSubTask,
  deleteSubTask,
  toggleSubTaskStatus,
} from "../controller/subTask.controller.js";

const router = Router();

router
  .route("/task/:taskId")
  .post(verifyJWT, createSubTask)
  .get(verifyJWT, getSubTasksByTask);

router.route("/:subTaskId")
  .get(verifyJWT, getSubTaskById)
  .patch(verifyJWT, updateSubTask)
  .delete(verifyJWT, deleteSubTask);

router.route("/:subTaskId/toogle-status").patch(verifyJWT , toggleSubTaskStatus)

export default router;
