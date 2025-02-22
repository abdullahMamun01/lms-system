
import {  Plus } from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import CourseList from "@/components/dashboard/CourseList";
import { getCourseList } from "@/services/course.service";



export default async function CoursesPage() {
  const response = await getCourseList()
  const data = response.data
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Courses</h1>
          <p className="text-muted-foreground">
            Manage your courses and their content
          </p>
        </div>
        <Button >
          <Link href="/dashboard/courses/add-course">
            <Plus className="w-4 h-4 mr-2" />
            Add Course
          </Link>
        </Button>
      </div>

      <div className="rounded-md border bg-card">
        {
          data .length > 0  ?  <CourseList courses={data}/> :
          <>
          
          </>
        }
       
      </div>
    </div>
  );
}
