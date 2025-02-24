"use client";

import type React from "react";


// import CourseForm from "@/components/forms/CourseForm";
import dynamic from "next/dynamic";
const CourseForm  = dynamic(() => import("@/components/forms/CourseForm"), { ssr: false });


export default function AddCoursePage() {

  return (
    <div className="p-8 bg-gray-50">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Add New Course</h1>
        <p className="text-muted-foreground">
          Create a new course by filling out the information below
        </p>
      </div>

      <CourseForm/>
    </div>
  );
}
