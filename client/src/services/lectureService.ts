import { IResponse } from "@/interfaces/response.interface";
import axiosInstance from "./axiosService";
import {
  ILecture,
  ILectureSchema,
  ILectureWithProgress,
} from "@/interfaces/lecture.inteface";

const addLectureByModule = async (
  moduleId: string,
  token: string,
  payload: FormData
) => {
  const response = await axiosInstance.post(
    `/modules/${moduleId}/lectures`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  const data = await response.data;
  return data;
};

const getLecturesByModule = async (
  moduleId: string,
  token: string
): Promise<IResponse<ILectureSchema[]>> => {
  const response = await axiosInstance.get(`/modules/${moduleId}/lectures`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const updateLectureById = async (
  lectureId: string,
  token: string,
  payload: FormData
): Promise<IResponse<ILecture>> => {
  const response = await axiosInstance.patch(
    `/lectures/${lectureId}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

const deleteLecture = async (lectureId: string, token: string) => {
  const response = await axiosInstance.delete(`/lectures/${lectureId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getLectureById = async (
  lectureId: string,
  token: string
): Promise<IResponse<ILectureWithProgress>> => {
  const response = await axiosInstance.get(`/lectures/${lectureId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const lectureMarkedAsComplete = async (lectureId: string, token: string) => {
  const response = await axiosInstance.post(
    `/lectures/${lectureId}/complete`,
    {
      state: "COMPLETED",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export {
  addLectureByModule,
  getLecturesByModule,
  updateLectureById,
  deleteLecture,
  getLectureById,
  lectureMarkedAsComplete,
};
