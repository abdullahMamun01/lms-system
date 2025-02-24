import { IResponse } from "@/interfaces/response.interface";
import axiosInstance from "./axiosService";
import { ICourseModule, IModule } from "@/interfaces/module.interface";

const getModuleById = async (
  moduleId: string,
  token: string
): Promise<IResponse<IModule>> => {
  const response = await axiosInstance.get(`/modules/${moduleId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getModulesByCourse = async (
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

const addModuleByCourse = async (
  courseId: string,
  title: string,
  token: string
): Promise<IResponse<IModule>> => {
  const response = await axiosInstance.post(
    `/courses/${courseId}/modules`,
    { title },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const updateModuleById = async (
  moduleId: string,
  title: string,
  token: string
): Promise<IResponse<IModule>> => {
  const response = await axiosInstance.patch(
    `/modules/${moduleId}`,
    { title },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const deleteModuleById = async (
  moduelId: string,
  token: string
): Promise<IResponse<IModule>> => {
  const response = await axiosInstance.delete(`/modules/${moduelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export {
  getModulesByCourse,
  addModuleByCourse,
  updateModuleById,
  deleteModuleById,
  getModuleById,
};
