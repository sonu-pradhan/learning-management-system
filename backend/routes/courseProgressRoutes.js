import express from "express"
import isAuthenticated from "../middlewares/isAuth.js";
import { getCourseProgress, markAsCompleted, markAsInCompleted, updateLectureProgress } from "../controllers/courseProgressController.js";

const router = express.Router()

router.route("/:courseId").get(isAuthenticated, getCourseProgress);
router.route("/:courseId/lecture/:lectureId/view").patch(isAuthenticated, updateLectureProgress);
router.route("/:courseId/complete").patch(isAuthenticated, markAsCompleted);
router.route("/:courseId/incomplete").patch(isAuthenticated, markAsInCompleted);

export default router;