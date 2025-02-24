
"use client";
import {  ILectureSchema } from "@/interfaces/lecture.inteface";
import { lectureSchema } from "@/zod/lecture.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ControlledInput from "./ControlledInput";
import SubmitBtn from "../auth/SubmitBtn";
import PdfFileUploadForm from "./PdfFileUploadForm";
import useAuth from "@/store/auth.store";
import {
  addLectureByModule,
  updateLectureById,
} from "@/services/lectureService";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { useLectureStore } from "@/store/lecture.stores";

export function LectureForm() {
  const { selectedLecture , removeLecture, lectures, setLectures } = useLectureStore();
  const [isLoading, setIsLoading] = useState(false);
  const { moduleId } = useParams();
  const form = useForm<ILectureSchema>({
    resolver: zodResolver(lectureSchema),
    defaultValues: {
      title: selectedLecture?.title || "",
      videoUrl: selectedLecture?.videoUrl || "",
    },
  });

  const { handleSubmit, control } = form;
  const { token } = useAuth();
  const onSubmit = async (data: ILectureSchema) => {
    if (!moduleId) return;
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("videoUrl", data.videoUrl);

    if (data.files) {
      data.files.forEach((fileObj) => {
        formData.append("files", fileObj.file);
      });
    }
    if (selectedLecture) {
      await handleUpdateLecture(formData);
    } else {
      await handleAddLecture(formData);
    }
    removeLecture()
  };

  const handleAddLecture = async (formData: FormData) => {
    setIsLoading(true);
    try {
      await addLectureByModule(moduleId as string, token as string, formData);
      toast.success(" lecture added successfully");
      setIsLoading(false);
    } catch (error) {
      const err = error as Error;
      setIsLoading(false);
      toast.error(err.message);
    }
  };

  const handleUpdateLecture = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const update = await updateLectureById(
        selectedLecture?.id as string,
        token as string,
        formData
      );

      if (selectedLecture) {
        const updateLecture = lectures.map((lecture) => {
          if (lecture.id === selectedLecture.id) {
            return update.data;
          }
          return lecture;
        });
        setLectures(updateLecture);
      }
      setIsLoading(false);
      toast.success("lecture updated successfully");
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white  p-2 w-full">
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Lecture Title
              </label>
              <ControlledInput
                type="text"
                control={control}
                name="title"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="videoUrl"
                className="block text-sm font-medium text-gray-700"
              >
                Video URL (YouTube Or Embed Any URL)
              </label>
              <ControlledInput
                type="url"
                control={control}
                name="videoUrl"
                placeholder="https://www.youtube.com/embed/..."
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <PdfFileUploadForm />

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <SubmitBtn
                isLoading={isLoading}
                loadingText={selectedLecture ? "updating..." : "creating..."}
              >
                {selectedLecture ? "update" : "create"}
              </SubmitBtn>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
