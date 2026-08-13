import Razorpay from "razorpay";
import Course from "../models/courseSchema.js";
import CoursePurchase from "../models/coursePurchaseSchema.js";
import crypto from "crypto";

const razorpay = new Razorpay({ key_id: process.env.RZP_API_KEY, key_secret: process.env.RZP_SECRET });

export const createRazorpayOrder = async (req, res) => {
    try {
        const userId = req.id;
        const { courseId } = req.body;

        const course = await Course.findById(courseId);
        if (!course) return res.statur(404).json({ message: "Course Not Found!" });

        const order = await razorpay.orders.create({
            amount: course.coursePrice * 100,
            currency: "INR",
            receipt: `course_${courseId}_${userId}`,
            notes: {
                courseId: courseId.toString(),
                userId: userId.toString(),
            },
        });

        const newPurchase = new CoursePurchase({
            courseId,
            userId,
            amount: course.coursePrice,
            status: "pending",
            razorpayOrderId: order.id,
        });

        await newPurchase.save();

        return res.status(200).json({
            success: true,
            order,
            key: process.env.RZP_API_KEY,
        });
    } catch (error) {
        console.log(error)
    }
}

export const verifyRazorpayPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        const purchase = await CoursePurchase.findOne({
            razorpayOrderId: razorpay_order_id,
        })

        if (!purchase) {
            return res.status(404).json({
                success: false,
                message: "Purchase not found!",
            });
        }

        const body =
            purchase.razorpayOrderId +
            "|" +
            razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed!",
            });
        }

        purchase.status = "completed";
        purchase.razorpayPaymentId = razorpay_payment_id;
        purchase.razorpaySignature = razorpay_signature;

        await purchase.save();

        await User.findByIdAndUpdate(
            purchase.userId,
            {
                $addToSet: {
                    enrolledCourses: purchase.courseId._id,
                },
            }
        );

        await Course.findByIdAndUpdate(
            purchase.courseId._id,
            {
                $addToSet: {
                    enrolledStudents: purchase.userId,
                },
            }
        );

        return res.status(200).json({
            success: true,
            message: "Payment verified successfully!",
        });

    } catch (error) {
        console.error("Payment verification error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};