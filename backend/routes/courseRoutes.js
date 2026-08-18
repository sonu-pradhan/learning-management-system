import express from "express";
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCoursesByAuthor, getLectureById, getPublishedCourse, removeCourse, removeLecture, searchCourse, togglePublishCourse } from "../controllers/courseController.js";
import isAuthenticated from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js"


const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);
router.route("/search").get(searchCourse);
router.route("/published-courses").get( getPublishedCourse);
router.route("/").get(isAuthenticated, getCoursesByAuthor);
router.route("/:courseId").put(isAuthenticated, upload.single("courseThumbnail"), editCourse);
router.route("/:courseId").get(isAuthenticated, getCourseById);
router.route("/:courseId/lectures").post(isAuthenticated, createLecture);
router.route("/:courseId/lectures").get(isAuthenticated, getCourseLecture);
router.route("/:courseId/lectures/:lectureId").post(isAuthenticated, editLecture);
router.route("/lectures/:lectureId").delete(isAuthenticated, removeLecture);
router.route("/lectures/:lectureId").get(isAuthenticated, getLectureById);
router.route("/:courseId").patch(isAuthenticated, togglePublishCourse);
router.route("/:courseId").delete(isAuthenticated, removeCourse);


export default router;