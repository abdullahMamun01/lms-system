"use client";
import { LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ICourse } from "@/interfaces/course.interface";

import EditCourseDescriptionForm from "../forms/EditCourseDescriptionForm";
import { useState } from "react";
import EditCourseTitleForm from "../forms/EditCourseTitleForm";
import CourseThumbnail from "./CourseThumbnail";
import EditCourseThumbnail from "../forms/EditCourseThumbnail";

type TEditCouse = "title" | "description" | "thumbnail" | "";

export default function DashboardCourseCard({ course }: { course: ICourse }) {
  const [courseInfo, setCourseInfo] = useState(course);
  const [editOption, setEditOption] = useState<TEditCouse>();

  const handleEditMode = (editOption: TEditCouse) => {
    setEditOption(editOption);
  };

  const handleCourseUpdate = (
    field: "title" | "description" | "thumbnail",
    value: string
  ) => {
    setCourseInfo((prev) => ({ ...prev, [field]: value }));
    setEditOption("");
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded bg-emerald-100 flex items-center justify-center">
            <LayoutGrid className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex gap-2 justify-between w-full">
            <h2 className="text-lg font-semibold">Customize your course</h2>
            {editOption && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEditMode("")}
                className="bg-red-500/20 hover:bg-primary/30"
              >
                cancel
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {editOption === "title" ? (
            <EditCourseTitleForm
              courseId={course.id}
              onUpdate={handleCourseUpdate}
              title={courseInfo.title}
            />
          ) : (
            <div>
              <div className="flex justify-between mb-2">
                <h3 className="font-medium">Course title</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditMode("title")}
                  className="bg-primary/20 hover:bg-primary/30"
                >
                  Edit Title
                </Button>
              </div>
              <p className="text-muted-foreground">{courseInfo.title}</p>
            </div>
          )}

          <Separator />

          {editOption === "description" ? (
            <EditCourseDescriptionForm
              courseId={course.id}
              onUpdate={handleCourseUpdate}
              description={courseInfo.description}
            />
          ) : (
            <div>
              <div className="flex justify-between mb-2">
                <h3 className="font-medium">Course Description</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditMode("description")}
                  className="bg-primary/20 hover:bg-primary/30"
                >
                  Edit Description
                </Button>
              </div>
              <p className="text-muted-foreground">{courseInfo.description}</p>
            </div>
          )}

          <Separator />
          {editOption === "thumbnail" ? (
            <EditCourseThumbnail
              courseId={course.id}
              onUpdate={handleCourseUpdate}
              thumnail={courseInfo.thumbnail}
            />
          ) : (
            <CourseThumbnail
              onEdit={() => handleEditMode("thumbnail")}
              thumbnail={courseInfo.thumbnail}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
