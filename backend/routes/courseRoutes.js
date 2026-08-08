import express from "express";
import { createCourse, editCourse, getCourseById, getCoursesByAuthor } from "../controllers/courseController.js";
import isAuthenticated from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js"


const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);
router.route("/").get(isAuthenticated, getCoursesByAuthor);
router.route("/:courseId").put(isAuthenticated, upload.single("courseThumbnail"), editCourse);
router.route("/:courseId").get(isAuthenticated, getCourseById);


export default router;