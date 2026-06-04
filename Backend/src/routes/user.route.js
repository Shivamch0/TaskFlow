import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { registerUser , loginUser, logoutUser  , currentUser , refreshAccessToken, updateProfile} from "../controller/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser)

//? Auth routes
router.route("/logout").post(verifyJWT , logoutUser);

router.route("/refresh-token").post(verifyJWT , refreshAccessToken)

router.route("/current-user").get(verifyJWT , currentUser )

router.route("/update-profile").patch(verifyJWT, updateProfile)

export default router;