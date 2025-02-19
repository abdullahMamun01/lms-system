/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";

import httpStatus from "http-status";

import { JwtPayload } from "jsonwebtoken";

import config from "../config";
import catchAsync from "../utils/catchAsync";
import { TUserRole } from "../interfaces/role.interface";
import AppError from "../errors/AppError";
import { verifyToken } from "../utils/jwt";
import UserModel from "../models/user.model";

export const authoRization = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "No authorization header provided"
      );
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "Invalid Bearer token format"
      );
    }

    const authorizedUser = (await verifyToken(
      token,
      config.accessTokenSecret as string
    )) as JwtPayload;


    if (!authorizedUser.role) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route"
      );
    }

    if (requiredRole && !requiredRole.includes(authorizedUser.role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route"
      );
    }
    const user = await UserModel.findById(authorizedUser.id).lean();

    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, "User not found");
    }

    if (user.isDeleted) {
      throw new AppError(httpStatus.UNAUTHORIZED, "The user is deleted");
    }

    req.user = authorizedUser as JwtPayload;

    next();
  });
};
