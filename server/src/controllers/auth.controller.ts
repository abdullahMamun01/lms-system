import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { AUthServices } from "../services/auth.services";
import sendResponse from "../utils/sendResponse";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const user = await AUthServices.loginUser(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User login successfully",
    data: user,
  });
});

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const user = await AUthServices.registerUser(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User register successfully",
    data: user,
  });
});

export const AuthController = {
  loginUser,
  registerUser,
};
