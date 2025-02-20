import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";

import AppError from "../errors/AppError";
import httpStatus from "http-status";
import { CourseServices } from "../services/course.services";
import { uploadSingleFile } from "../utils/uploadFile";

const getAllCourse = catchAsync(async (req: Request, res: Response) => {
  const courses = await CourseServices.getCourses(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get all course retrieved successfully",
    data: courses,
  });
});

const getModuleAndLecturesByCourseId = catchAsync(
  async (req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const courses = await CourseServices.getModuleAndLecturesByCourseId(courseId , req.user.userId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All lectures retrieved successfully",
      data: courses,
    });
  }
);

const getCouserById = catchAsync(async (req: Request, res: Response) => {
  const course = await CourseServices.getCourseById(req.params.courseId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get course retrieved successfully",
    data: course,
  });
});

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const file = req.file;
  if (!file) throw new AppError(httpStatus.BAD_REQUEST, "File is required");
  const thumbnail = (await uploadSingleFile(req.file as Express.Multer.File))
    .secure_url;
  const course = await CourseServices.createCoures({ ...req.body, thumbnail });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Course created successfully",
    data: course,
  });
});

const updateCourse = catchAsync(async (req: Request, res: Response) => {
  const course = await CourseServices.updateCourse(
    req.params.courseId,
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Course updated successfully",
    data: course,
  });
});

const deleteCourse = catchAsync(async (req: Request, res: Response) => {
  const course = await CourseServices.deleteCourse(req.params.courseId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Course deleted successfully",
    data: course,
  });
});

export const CourseController = {
  getAllCourse,
  getCouserById,
  createCourse,
  updateCourse,
  deleteCourse,
  getModuleAndLecturesByCourseId
};
