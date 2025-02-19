import express from "express";

import { uploadFile } from "../utils/multer";
import { CourseController } from "../controllers/course.controllers";
import { validateRequest } from "../middlewares/validateRequest";
import { courseSchema } from "../validations/course.validation";
import { authoRization } from "../middlewares/authorization";

const router = express.Router();

// Define course routes
router.post(
  "/",
  uploadFile("file"),
  authoRization('ADMIN')
//   validateRequest(courseSchema),
//   CourseController.createCourse
);

export default router;
