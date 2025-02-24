/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { getModuleById } from "@/services/moduleService";
import useAuth from "@/store/auth.store";
import React, { useEffect, useState } from "react";
import ModuleTitle from "./ModuleTitle";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useLectureStore } from "@/store/lecture.stores";
import { ILecture } from "@/interfaces/lecture.inteface";

export default function Module({ moduleId }: { moduleId: string }) {
  const {setLectures} = useLectureStore()
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [moduleTitle, setModuleTitle] = useState("");
  useEffect(() => {
    const getModule = async () => {
      setIsLoading(true);
      try {
        const courseModule = await getModuleById(moduleId, token as string);
        setModuleTitle(courseModule.data.title);
        setLectures(courseModule.data.lectures as ILecture[])
        setIsLoading(false);
      } catch (error : any) {
        setIsLoading(false);
      }
    };

    if (token && moduleId) getModule();
  }, [token, moduleId]);
  return (
    <div className="ml-4 mb-2">
      {isLoading ? <LoadingSpinner /> : <ModuleTitle title={moduleTitle} />}
    </div>
  );
}
