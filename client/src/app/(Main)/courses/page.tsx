

import {  getCourseList } from "@/services/course.service";
import CourseCard from "@/components/home/CourseCard";

export default async function Courses() {
  const response = await getCourseList()
  const courses = response.data
  
  return (
    <section className="py-16   bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="mb-4 text-4xl font-bold text-secondary">Our Currently ALL Courses</h2>
          <p className="mb-8 text-secondary/80">
            Choose from hundreds of courses from specialist organizations
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {courses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
       
      </div>
    </section>
  );
}
