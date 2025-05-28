import { clerkClient } from "@clerk/express";
import Course from "../models/Course.js";
import { v2 as cloudinary } from "cloudinary";

// update role to educator
export const updateRoleToEducator = async (req, res) => {
    try {
        const { userId } = req.auth(); // no await needed here

        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
                role: "educator",
            }
        });
        res.json({ success: true, message: "You can publish a course now" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// add new course
export const addCourse = async (req, res) => {
    try {
        const { courseData } = req.body;
        const imageFile = req.file;
        const { userId: educatorId } = req.auth(); // no await needed here

        if (!imageFile) {
            return res.json({ success: false, message: "Thumbnail Not Attached" });
        }

        const parsedCourseData = JSON.parse(courseData);
        parsedCourseData.educator = educatorId;

        const newCourse = await Course.create(parsedCourseData);

        // ✅ Upload image to Cloudinary with unsigned preset
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            upload_preset: "unsigned_lms", // 🔁 Replace this with your actual unsigned preset name
        });

        newCourse.courseThumbnail = imageUpload.secure_url;
        await newCourse.save();

        res.json({ success: true, message: "Course Added" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
