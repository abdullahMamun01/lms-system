import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { LectureServices } from '../services/lecture.services';
import sendResponse from '../utils/sendResponse';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import { uploadFiles } from '../utils/multer';
import { uploadMultipleFiles } from '../utils/uploadFile';

const getAllLectures = catchAsync(async (req: Request, res: Response) => {
  const lectures = await LectureServices.getAllLectures(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Get all lectures retrieved successfully',
    data: lectures,
  });
});

const getLecturesByModuleId = catchAsync(
  async (req: Request, res: Response) => {
    const moduleId = req.params.moduleId;
    const lectures = await LectureServices.getLecturesByModuleId(moduleId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Get all lectures retrieved successfully',
      data: lectures,
    });
  }
);

const getLectureById = catchAsync(async (req: Request, res: Response) => {
  const lecture = await LectureServices.getLectureById(req.params.lectureId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Get lecture retrieved successfully',
    data: lecture,
  });
});

const createLecture = catchAsync(async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  console.log(files);
  if (files) {
    const pdfNotes = (
      await uploadMultipleFiles(files as Express.Multer.File[], 'lecture-notes')
    ).map((file) => file.secure_url);
    req.body.pdfNotes = pdfNotes;
  }
  const lecture = await LectureServices.createLecture({
    ...req.body,
    module: req.params.moduleId,
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Lecture created successfully',
    data: lecture,
  });
});

const updatedLecture = catchAsync(async (req: Request, res: Response) => {
  const lectureId = req.params.lectureId;
  const lecture = await LectureServices.updateLecture(
    lectureId,
    req.body,
    req.files as Express.Multer.File[]
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Lecture updated successfully',
    data: lecture,
  });
});

const deletedLecture = catchAsync(async (req: Request, res: Response) => {
  const lectureId = req.params.lectureId;
  const lecture = await LectureServices.deleteLecture(lectureId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Lecture deleted successfully',
    data: lecture,
  });
});

export const LectureController = {
  getAllLectures,
  getLecturesByModuleId,
  createLecture,
  updatedLecture,
  deletedLecture,
  getLectureById
};
