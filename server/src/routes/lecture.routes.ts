import express from "express";
import { LectureController } from "../controllers/lectures.controller";
import { uploadFiles } from "../utils/multer";
import { authoRization } from "../middlewares/authorization";
import { validateRequest } from "../middlewares/validateRequest";
import {
  lectureSchema,
  updateLectureSchema,
} from "../validations/lecture.validation";

const router = express.Router();

router.get("/", LectureController.getAllLectures);

router.patch(
  "/:lectureId",
  uploadFiles("files"),
  authoRization("ADMIN"),
  validateRequest(updateLectureSchema),
  LectureController.updatedLecture
);

router.delete(
  "/:lectureId",
  authoRization("ADMIN"),
  LectureController.deletedLecture
);

export default router;
