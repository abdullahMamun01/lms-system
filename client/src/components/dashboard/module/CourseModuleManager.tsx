/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Card } from "@/components/ui/card";

import React, { useEffect, useState } from "react";
import CourseModules from "./CourseModules";
import ModuleForm from "./ModuleForm";
import { getModulesByCourse } from "@/services/moduleService";
import { IModule } from "@/interfaces/module.interface";
import useAuth from "@/store/auth.store";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function CourseModuleManager({
  courseId,
}: {
  courseId: string;
}) {
  const [modules, setModules] = useState<IModule[]>([]);
  const { token } = useAuth();
  const [isLoading,setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    async function getModules() {
      const response = await getModulesByCourse(courseId, token as string);
      const moduleList = response?.data?.modules.map(({ lectures, ...others }) => ({
        ...others,
      }));
      if (moduleList) {
        setModules(moduleList);
        setIsLoading(false)
      }
    }
    
    if (token && courseId) {
      getModules();
      setIsLoading(false)
    }
  }, [token, courseId]);

  if(isLoading){
    return <LoadingSpinner/>
  }

  return (
    <div className="space-y-8">
      <Card>
        <ModuleForm />
        <CourseModules modules={modules} />
      </Card>
    </div>
  );
}
