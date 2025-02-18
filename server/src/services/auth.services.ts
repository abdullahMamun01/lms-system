import AppError from "../errors/AppError";
import { ILogin, IRegister } from "../interfaces/auth.interface";

import httpStatus from "http-status";
import { hashPassword, verifyPassword } from "../utils/bcrypt";
import { generateToken } from "../utils/jwt";
import { convertObjectIdToId } from "../utils/convertObjectId";
import UserModel from "../models/user.model";

const loginUser = async (payload: ILogin) => {
  const user = await UserModel.findOne({ email: payload.email }).lean();
  console.log({user})
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const isPasswordMatch = await verifyPassword(payload.password, user.password);
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }
  const token = generateToken(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET as string
  );

  return {
    accessToken: token,
    user: convertObjectIdToId(user),
  };
};

const registerUser = async (payload: IRegister) => {

  const user = await UserModel.findOne({ email: payload.email }).lean();
  if (user) {
    throw new AppError(httpStatus.CONFLICT, "User already exists");
  }

  const hashedPassword = await hashPassword(payload.password);
  console.log({hashedPassword})
  const savedUser = await UserModel.create({
    ...payload,
    password: hashedPassword,
  });
  return convertObjectIdToId(savedUser.toObject());
};

export const AUthServices = {
  loginUser,
  registerUser,
};
