import express from "express";

import { uploadFile } from "../utils/multer";
import { CourseController } from "../controllers/course.controllers";
import { validateRequest } from "../middlewares/validateRequest";
import {
  courseSchema,
  updateCourseSchema,
} from "../validations/course.validation";
import { authoRization } from "../middlewares/authorization";
import { ModuleConroller } from "../controllers/module.controller";
import { ModuleSchema } from "../validations/courserModule.validation";

const router = express.Router();

// Define course routes

router.get("/", CourseController.getAllCourse);

router.get("/:courseId", CourseController.getCouserById);
router.get(
  "/:courseId/modules",
  authoRization("USER", "ADMIN"),
  CourseController.getModuleAndLecturesByCourseId
);

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
  validateRequest(ModuleSchema),
  authoRization("ADMIN"),
  ModuleConroller.createModule
);

export default router;
