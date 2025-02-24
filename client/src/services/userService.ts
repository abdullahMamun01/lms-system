import { IResponse } from "@/interfaces/response.interface";
import axiosInstance from "./axiosService";

export interface IUserCourse {
  id: string;
  thumbnail: string;
  title: string;
  lastLession: string;
}

const getMyCourses = async (
  token: string
): Promise<IResponse<IUserCourse[]>> => {
  const response = await axiosInstance.get(`/users/courses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export { getMyCourses };
