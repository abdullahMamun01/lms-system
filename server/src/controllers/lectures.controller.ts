import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { LectureServices } from "../services/lecture.services";
import sendResponse from "../utils/sendResponse";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import { uploadFiles } from "../utils/multer";
import { uploadMultipleFiles } from "../utils/uploadFile";

const getAllLectures = catchAsync(async (req: Request, res: Response) => {
  const lectures = await LectureServices.getAllLectures(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get all lectures retrieved successfully",
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
      message: "Get all lectures retrieved successfully",
      data: lectures,
    });
  }
);

const createLecture = catchAsync(async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];

  if (!files || files.length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "Please upload a file");
  }
  const lecture = await LectureServices.createLecture(
    { ...req.body, module: req.params.moduleId },
    files
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Lecture created successfully",
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
    message: "Lecture updated successfully",
    data: lecture,
  });


});

const deletedLecture = catchAsync(async (req: Request, res: Response) => {
  const lectureId = req.params.lectureId;
  const lecture = await LectureServices.deleteLecture(lectureId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Lecture deleted successfully",
    data: lecture,
  });
  
});

export const LectureController = {
  getAllLectures,
  getLecturesByModuleId,
  createLecture,
  updatedLecture,
  deletedLecture,
};
