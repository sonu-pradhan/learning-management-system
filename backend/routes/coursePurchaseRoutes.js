import express from "express";
import isAuthenticated from "../middlewares/isAuth.js"
import { createRazorpayOrder, getCourseDetailWithPurchaseStatus, verifyRazorpayPayment } from "../controllers/coursePurchaseController.js";

const router = express.Router();

router.route("/create-order").post(isAuthenticated, createRazorpayOrder);
router.route("/verify-payment").post(isAuthenticated, verifyRazorpayPayment);
router.route("/:courseId/detail-with-status").get(isAuthenticated, getCourseDetailWithPurchaseStatus);

export default router;