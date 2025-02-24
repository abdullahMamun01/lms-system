import { IResponse } from "@/interfaces/response.interface";
import { IUser } from "@/interfaces/user.interface";

import axiosInstance from "./axiosService";
import { IRegister } from "@/interfaces/auth.interface";

const login = async (payload: {
  email: string;
  password: string;
}): Promise<
  IResponse<{
    user: IUser;
    accessToken: string;
  }>
> => {
  const response = await axiosInstance.post(`/auth/signin`, payload);
  const data = await response.data;
  
  return data;
};

const register = async (payload: IRegister) => {
  const response = await axiosInstance.post(`/auth/signup`, payload);
  const data = await response.data;
  return data;
};

export { login,register };
