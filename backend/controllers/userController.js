import { User } from "../models/userSchema.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { deleteImageFromCloud, uploadMedia } from "../config/cloudinary.js";
import fs from "node:fs"

export const Register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

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
            password: hashedPassword,
            role
        });

        return res.status(201).json({
            message: "Account created successfylly",
            success: true
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to register"
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
            sameSite: "strict",
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
            success: false,
            message: "Failed to login"
        })
    }
}

export const Logout = async (_, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to logout"
        })
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password").populate("enrolledCourses");
        if (!user) {
            return res.status(404).json({
                message: "Profile not found",
                success: false
            })
        }
        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to load user"
        })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { name } = req.body;
        const newProfilePhoto = req.file;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        const updatedData = {
            name
        };

        if (newProfilePhoto) {
            if (user.cloudinaryProfileId) {
                await deleteImageFromCloud(user.cloudinaryProfileId);
            }

            const cloudResponse = await uploadMedia(newProfilePhoto.path);

            await fs.promises.unlink(newProfilePhoto.path);

            updatedData.profilePhoto = cloudResponse.secure_url;
            updatedData.cloudinaryProfileId = cloudResponse.public_id;
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {returnDocument: "after"});

        return res.status(200).json({
            success: true,
            user: updatedUser,
            message: "Profile updated successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update"
        })
    }
}