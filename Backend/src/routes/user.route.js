import { Router } from "express";
import { registerUser , loggedInUser } from "../controller/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loggedInUser)

export default router;