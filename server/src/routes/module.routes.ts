import express from "express";
import { LectureController } from "../controllers/lectures.controller";
import { uploadFiles } from "../utils/multer";
import { authoRization } from "../middlewares/authorization";
import { validateRequest } from "../middlewares/validateRequest";
import { lectureSchema } from "../validations/lecture.validation";
import { ModuleConroller } from "../controllers/module.controller";

const router = express.Router();


router.get(
  "/:moduleId",
  authoRization("ADMIN" , "USER"),
  ModuleConroller.getModuleById
);

router.get("/:moduleId/lectures" , authoRization("ADMIN" , "USER"), LectureController.getLecturesByModuleId);
router.patch('/:moduleId', authoRization("ADMIN"), ModuleConroller.updateModule)
router.post(
  "/:moduleId/lectures",
  uploadFiles("files"),
  authoRization("ADMIN"),
  validateRequest(lectureSchema),
  LectureController.createLecture
);


router.delete(
  "/:moduleId",
  authoRization("ADMIN"),
  ModuleConroller.getModuleById
);
export default router;
