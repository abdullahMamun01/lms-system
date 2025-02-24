"use client";
import { getMyCourses, IUserCourse } from "@/services/userService";
import useAuth from "@/store/auth.store";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useFetch } from "@/hooks/useFetch";

export default function MyCourses() {
  const { token } = useAuth();

  const { data, isLoading } = useFetch<IUserCourse[]>(
    () => getMyCourses(token as string),
    [token]
  );
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2">
        {data?.map((course) => (
          <div
            key={course.id}
            className="rounded-lg bg-secondary p-4 backdrop-blur-sm"
          >
            <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={course.thumbnail || "/placeholder.svg"}
                alt={course.title}
                fill
                className="object-cover"
              />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-white">
              {course.title}
            </h2>

            <div className="mb-4">
            </div>
            <div className="flex gap-4">
              <Link
                href={`/courses/${course.id}/lectures/${course.lastLession}`}
              >
                <Button className="bg-primary/80 hover:bg-primary/90">
                  Continue
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-primary/70 text-secondary hover:bg-[#8A2BE2]/10"
              >
                Outline
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
