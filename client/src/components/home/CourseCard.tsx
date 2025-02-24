import { Clock, Heart } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

import { ICourse } from "@/interfaces/course.interface";
import Link from "next/link";

export default function CourseCard({ course }: { course: ICourse }) {
  return (
    <Link href={`/courses/${course.id}`}>
      <Card className="overflow-hidden border-none">
        <div className={`relative h-48 p-8`}>
          <div className="absolute inset-0  bg-cover bg-center opacity-50" />
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="relative h-96 object-cover object-center"
          />
        </div>
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <button className="text-gray-400 hover:text-red-500">
              <Heart className="h-5 w-5" />
            </button>
          </div>
          <h3 className="mt-6 text-lg font-semibold text-secondary line-clamp-1">
            {course.title}
          </h3>
          <p className="text-sm text-secondary/80 line-clamp-1">
            {course.description}
          </p>
        </CardHeader>
        <CardContent>
          {/* <StarRating rating={course.rating} /> */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-2 text-secondary">
              <Clock className="h-4 w-4" />
              9h 56m
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              4 lectures
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
