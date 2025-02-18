import AppError from "../errors/AppError";
import { ILogin } from "../interfaces/auth.interface";
import userModel from "../models/user.model";
import httpStatus from "http-status";
import { verifyPassword } from "../utils/bcrypt";
import { generateToken } from "../utils/jwt";

const loginUser = async (payload: ILogin) => {
  const user = await userModel.findOne({ email: payload.email });
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
    user,
  };
};

const registerUser = () => {};

export const AUthServices = {
  loginUser,
  registerUser,
};
