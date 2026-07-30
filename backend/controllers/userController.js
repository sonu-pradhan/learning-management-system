import { User } from "../models/userSchema.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(401).json({
                message: "All fields are required.",
                success: false
            })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "User already exist.",
                success: false
            })
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "Account created successfylly",
            success: true
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Failed to register"
        })
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "All fields are required.",
                success: false
            })
        };
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Account does not exist",
                success: false
            })
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Incorect password",
                success: false
            });
        }

        const token = await jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, { expiresIn: "7d" })

        res.cookie("token", token, {
            httpOnly: true,
            sameSite:"strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "Login successful",
            user,
            success: true
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Failed to login"
        })
    }
}