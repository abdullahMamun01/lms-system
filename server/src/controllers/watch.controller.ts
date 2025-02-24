import { WatchServices } from '../services/watch.services';
import { Request, Response } from 'express';
import sendResponse from '../utils/sendResponse';
import catchAsync from '../utils/catchAsync';

const getCompletedLectureIds = catchAsync(
  async (req: Request, res: Response) => {
    const completedLectures = await WatchServices.getCompletedLectureIds(
      req.user.userId,
      req.body
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Completed lectures retrieved successfully',
      data: completedLectures,
    });
  }
);

const markLectureAsCompleted = catchAsync(
  async (req: Request, res: Response) => {
    const lectureId = req.params.lectureId;
    const completedLecture = await WatchServices.markedAsLectureCompleted({
      ...req.body,
      lecture: lectureId,
      user: req.user.userId,
    });
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Lecture marked as completed successfully',
      data: completedLecture,
    });
  }
);

const updateLectureCompletedStatus = catchAsync(
  async (req: Request, res: Response) => {
    const completedLecture = await WatchServices.updateWatchLectureState({
      ...req.body,
      userId: req.user.userId,
    });
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Lecture marked as completed successfully',
      data: completedLecture,
    });
  }
);

export const WatchLectureController = {
  getCompletedLectureIds,
  markLectureAsCompleted,
  updateLectureCompletedStatus,
};
