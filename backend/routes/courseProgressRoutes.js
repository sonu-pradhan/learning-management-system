import express from "express"
import isAuthenticated from "../middlewares/isAuth.js";
import { getCourseProgress, markAsCompleted, markAsInComplete, updateLectureProgress } from "../controllers/courseProgressController.js";

const router = express.Router()

router.route("/:courseId").get(isAuthenticated, getCourseProgress);
router.route("/:courseId/lectures/:lectureId/view").patch(isAuthenticated, updateLectureProgress);
router.route("/:courseId/complete").patch(isAuthenticated, markAsCompleted);
router.route("/:courseId/incomplete").patch(isAuthenticated, markAsInComplete);

export default router;