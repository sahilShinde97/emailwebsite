import express from "express";
import { addCourse, updateRoleToEducator } from "../controllers/educatorController.js";
import upload from "../configs/multer.js";
import { protectEducator } from "../middlewares/authMiddleware.js";

const educatorRouter = express.Router();

// add educator Role
educatorRouter.get('/update-role', updateRoleToEducator);

// protect first, then handle uploads
educatorRouter.post('/add-course', protectEducator, upload.single('image'), addCourse);

export default educatorRouter;
