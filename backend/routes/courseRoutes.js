import express from "express";
import { createCourse, getCoursesByAuthor } from "../controllers/courseController.js";
import isAuthenticated from "../middlewares/isAuth.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);
router.route("/").get(isAuthenticated, getCoursesByAuthor);

export default router;