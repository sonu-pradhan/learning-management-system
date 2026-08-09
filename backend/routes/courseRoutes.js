import express from "express";
import { createCourse, createLecture, editCourse, getCourseById, getCourseLecture, getCoursesByAuthor } from "../controllers/courseController.js";
import isAuthenticated from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js"


const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);
router.route("/").get(isAuthenticated, getCoursesByAuthor);
router.route("/:courseId").put(isAuthenticated, upload.single("courseThumbnail"), editCourse);
router.route("/:courseId").get(isAuthenticated, getCourseById);
router.route("/:courseId/lectures").post(isAuthenticated, createLecture);
router.route("/:courseId/lectures").get(isAuthenticated, getCourseLecture);


export default router;