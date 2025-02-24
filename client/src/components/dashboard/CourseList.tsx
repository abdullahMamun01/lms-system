"use client";

import { Edit, MoreVertical, Trash } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Clock, Heart } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ICourse } from "@/interfaces/course.interface";
import DeleteCourseModal from "./DeleteCourseModal";
import Link from "next/link";

export default function CourseList({ courses }: { courses: ICourse[] }) {
  return (
    <>
 

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card className="overflow-hidden border-none col-span-1 shadow-md">
            <div className={`relative h-48 p-8`}>
              <div className="absolute inset-0  bg-cover bg-center opacity-50 col-span-3" />
              <Image
                src={course.thumbnail}
                alt={course.title}
                fill
                className="relative h-96 object-cover object-center"
              />
            </div>
            <CardHeader className="relative">
              <div className="flex items-center justify-between"></div>
              <h3 className="mt-6 text-lg font-semibold text-secondary line-clamp-1">
                {course.title}
              </h3>
              <p className="text-sm text-secondary/80 line-clamp-1">
                {course.description}
              </p>
            </CardHeader>
            <CardContent className="flex justify-end items-center gap-4">
              <Link href={`/dashboard/courses/${course.id}`} className="flex items-center">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Link>

              <DeleteCourseModal courseId={course.id}>
                <span className="flex justify-center items-center pl-2 text-red-500">
                  <Trash className="w-4 h-4 mr-2 " /> Delete
                </span>
              </DeleteCourseModal>
            </CardContent>
          </Card>
        ))}

        {/* <Link  href={`/dashboard/courses/${course.id}`} className="col-span-3"></Link> */}
      </div>
    </>
  );
}
