import CourseDetails from "@/components/course-details/CourseDetails";
import InstructorSection from "@/components/course-details/InstructorSection";
import React from "react";
type TParams = Promise<{ id: string }>;

export default async function CourseDetailsPage({
  params,
}: {
  params: TParams;
}) {
  const { id } = await params;
  return (
    <div>
      <CourseDetails courseId={id} />
      <InstructorSection />
    </div>
  );
}
