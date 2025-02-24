/* eslint-disable @typescript-eslint/no-unused-vars */
import { IResponse } from "@/interfaces/response.interface";
import axiosInstance from "./axiosService";
import { ICourse } from "@/interfaces/course.interface";
import { ICourseModule, IModule } from "@/interfaces/module.interface";



const getModuleAndLessionsByCourseId = async (
  courseId: string,
  token: string
): Promise<IResponse<ICourseModule>> => {
  const response = await axiosInstance.get(`/courses/${courseId}/modules`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const addCourse = async (data: FormData, token: string) => {
  const response = await axiosInstance.post("/courses", data, {
    headers: {
      "Content-Type": "multipart/form-data", //
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

const getCourseList = async (query?: string): Promise<IResponse<ICourse[]>> => {
  const response = await axiosInstance.get(`/courses?${query}`);
  const data = response.data;
  return data;
};

const getCourseById = async (courseId: string): Promise<IResponse<ICourse>> => {
  const response = await axiosInstance.get(`/courses/${courseId}`);
  const data = response.data;
  return data;
};

const updateCourse = async (
  courseid: string,
  data: Partial<ICourse> | FormData,
  token: string
) => {
  const response = await axiosInstance.patch(`/courses/${courseid}`, data, {
    headers: {
      "Content-Type": "multipart/form-data", //
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

const deleteCourse = async (courseId: string, token: string) => {
  const response = await axiosInstance.delete(`/courses/${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export {
  addCourse,
  updateCourse,
  deleteCourse,
  getCourseList,
  getCourseById,
  getModuleAndLessionsByCourseId,
};
