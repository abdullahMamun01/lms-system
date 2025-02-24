

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import DashboardCourseCard from "@/components/dashboard/DashboardCourseCard";
import { getCourseById } from "@/services/course.service";

import CourseModuleManager from "@/components/dashboard/module/CourseModuleManager";

interface Props {
  params: Promise<{ courseId: string }>;
}

export default async function CourseManagePage({ params }: Props) {
  const { courseId } = await params;
  const response = await getCourseById(courseId);
  const course = response.data;

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex-1">
          <Alert className="bg-yellow-50 border-yellow-200">
            <AlertDescription>
              This course is unpublished. It will not be visible in the course.
            </AlertDescription>
          </Alert>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="default">Publish</Button>
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <DashboardCourseCard course={course} />

        {/* Right Column */}
        <CourseModuleManager courseId={courseId} />
      </div>
    </div>
  );
}
