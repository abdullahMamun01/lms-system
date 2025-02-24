/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Card } from "@/components/ui/card";

import React, { useEffect, useState } from "react";
import CourseModules from "./CourseModules";
import ModuleForm from "./ModuleForm";
import { getModulesByCourse } from "@/services/moduleService";
import { IModule } from "@/interfaces/module.interface";
import useAuth from "@/store/auth.store";

export default function CourseModuleManager({
  courseId,
}: {
  courseId: string;
}) {
  const [modules, setModules] = useState<IModule[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    async function getModules() {
      const response = await getModulesByCourse(courseId, token as string);
      const moduleList = response?.data?.map(({ lectures, ...others }) => ({
        ...others,
      }));
      if (moduleList) {
        setModules(moduleList);
      }
    }

    if (token && courseId) {
      getModules();
    }
  }, [token, courseId]);

  return (
    <div className="space-y-8">
      <Card>
        <ModuleForm />
        <CourseModules modules={modules} />
      </Card>
    </div>
  );
}
