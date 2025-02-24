import express from 'express';
import { LectureController } from '../controllers/lectures.controller';
import { uploadFiles } from '../utils/multer';
import { authoRization } from '../middlewares/authorization';
import { validateRequest } from '../middlewares/validateRequest';
import {
  lectureSchema,
  updateLectureSchema,
} from '../validations/lecture.validation';
import { WatchLectureController } from '../controllers/watch.controller';
import { watchLectureSchema } from '../validations/watch.validation';

const router = express.Router();

router.get(
  '/',
  authoRization('USER', 'ADMIN'),
  LectureController.getAllLectures
);
router.get(
  '/:lectureId',
  authoRization('USER', 'ADMIN'),
  LectureController.getLectureById
);

router.post(
  '/:lectureId/complete',
  authoRization('USER'),
  validateRequest(watchLectureSchema),
  WatchLectureController.markLectureAsCompleted
);

router.patch(
  '/:lectureId',
  uploadFiles('files'),
  authoRization('ADMIN'),
  validateRequest(updateLectureSchema),
  LectureController.updatedLecture
);

router.delete(
  '/:lectureId',
  authoRization('ADMIN'),
  LectureController.deletedLecture
);

export default router;
