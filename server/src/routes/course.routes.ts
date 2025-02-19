import express from "express";

import { uploadFile } from "../utils/multer";
import { CourseController } from "../controllers/course.controllers";
import { validateRequest } from "../middlewares/validateRequest";
import {
  courseSchema,
  updateCourseSchema,
} from "../validations/course.validation";
import { authoRization } from "../middlewares/authorization";
import { CourseModuleConroller } from "../controllers/courseModule.controller";
import { courseModuleSchema } from "../validations/courserModule.validation";

const router = express.Router();

// Define course routes

router.get("/", CourseController.getAllCourse);

router.get("/:courseId", CourseController.getCouserById);

router.post(
  "/",
  uploadFile("file"),
  validateRequest(courseSchema),
  authoRization("ADMIN"),
  CourseController.createCourse
);



router.patch(
  "/:courseId",
  uploadFile("file"),
  validateRequest(updateCourseSchema),
  authoRization("ADMIN"),
  CourseController.updateCourse
);

router.delete(
  "/:courseId",
  authoRization("ADMIN"),
  CourseController.deleteCourse
);

router.post(
  "/:courseId/modules",
  validateRequest(courseModuleSchema),
  authoRization("ADMIN"),
  CourseModuleConroller.createModule
);


export default router;
