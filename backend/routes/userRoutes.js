import express from "express";
import { getUserProfile, Login, Logout, Register, updateProfile } from "../controllers/userController.js";
import isAuthenticated from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js"

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(Logout);
router.route("/profile").get(isAuthenticated, getUserProfile);
router.route("/profile/update").put(isAuthenticated,upload.single("profilePhoto"), updateProfile);

export default router;