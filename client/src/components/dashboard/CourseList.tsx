"use client";

import { Edit, MoreVertical, Trash } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>

            <TableHead>Price</TableHead>

            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell>
                <Image
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  width={80}
                  height={45}
                  className="rounded-md object-cover"
                />
              </TableCell>
              <TableCell className="font-medium max-w-[200px] truncate">
                {course.title}
              </TableCell>
              <TableCell className="line-clamp-2">
                {course.description}
              </TableCell>

              <TableCell>${course.price}</TableCell>

              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link href={`/dashboard/courses/${course.id}`} className="flex ">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Link>
                    </DropdownMenuItem>

                    <DeleteCourseModal courseId={course.id}>
                      <span className="flex justify-center items-center pl-2 text-red-500">
                        <Trash className="w-4 h-4 mr-2 " /> Delete
                      </span>
                    </DeleteCourseModal>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
