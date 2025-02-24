import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import CourseCard from "./CourseCard";
import { getCourseList } from "@/services/course.service";
import Link from "next/link";
export default async function Courses() {
  const response = await getCourseList(`page=1&limi=4`);
  const courses = response.data;

  return (
    <section className="py-16   bg-gray-50">
      <div className="max-w-7xl mx-auto lg:px-0 px-4">
        <div className="text-center">
          <h2 className="mb-4 text-4xl font-bold text-secondary">
            Our Courses
          </h2>
          <p className="mb-8 text-secondary/80">
            Choose from hundreds of courses from specialist organizations
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {courses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
        <div>
          <Link href="/courses">
            <Button
              size="sm"
              className="flex items-center text-sm md:text-lg md:px-7 md:py-5 gap-2 bg-primary/90 hover:bg-primary mt-6 text-gray-50 mx-auto px-6 uppercase"
            >
              <span className="text-[12px] md:text-[14px]"> View All</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
