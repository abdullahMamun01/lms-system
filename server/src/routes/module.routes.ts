import express from "express";
import { LectureController } from "../controllers/lectures.controller";
import { uploadFiles } from "../utils/multer";
import { authoRization } from "../middlewares/authorization";
import { validateRequest } from "../middlewares/validateRequest";
import { lectureSchema } from "../validations/lecture.validation";

const router = express.Router();



router.get("/:moduleId/lectures", LectureController.getLecturesByModuleId);

router.post(
  "/:moduleId/lectures",
  uploadFiles("files"),
  authoRization("ADMIN"),
  validateRequest(lectureSchema),
  LectureController.createLecture
);


export default router;
