import { Plus } from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import CourseList from "@/components/dashboard/CourseList";
import { getCourseList } from "@/services/course.service";

export default async function AdminDashboard() {
  const response = await getCourseList();
  const data = response.data;
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Courses</h1>
          <p className="text-muted-foreground">
            Manage your courses and their content
          </p>
        </div>
        <Link href="/dashboard/courses/add-course">
          <Button className="flex ">
            <Plus className="w-4 h-4" />
            Add Course
          </Button>
        </Link>
      </div>

      <div className="rounded-md ">
        {data.length > 0 ? <CourseList courses={data} /> : <></>}
      </div>
    </div>
  );
}
