import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { CourseServices } from "../services/course.services";
import sendResponse from "../utils/sendResponse";

const getUsersCourses = catchAsync(async (req: Request, res: Response) => {
    const courses = await CourseServices.getUsersCourse(req.user.userId);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Get all course retrieved successfully",
        data: courses,
    })
})



export const UserController   =  {
  getUsersCourses
}