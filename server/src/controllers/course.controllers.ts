import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { uploadImage } from "../utils/uploadImage";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import { CourseServices } from "../services/course.services";

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const file = req.file;
  if (!file) throw new AppError(httpStatus.BAD_REQUEST, "File is required");
  const thumbnail = (await uploadImage(req.file as Express.Multer.File))
    .secure_url;
  const course = await CourseServices.createCoures({ ...req.body, thumbnail });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Course created successfully",
    data: course,
  });
});

export const CourseController = {
  createCourse,
};
