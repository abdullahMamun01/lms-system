import {  LayoutGrid } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { ICourse } from "@/interfaces/course.interface";
export default function DashboardCourseCard({course} : {course:ICourse}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded bg-emerald-100 flex items-center justify-center">
            <LayoutGrid className="w-5 h-5 text-emerald-600" />
          </div>
          <h2 className="text-lg font-semibold">Customize your course</h2>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">Course title</h3>
              <Button variant="ghost" size="sm" className="bg-primary/20 hover:bg-primary/30">
                Edit Title
              </Button>
            </div>
            <p className="text-muted-foreground">
             {course.title}
            </p>
          </div>

          <Separator />

          <div>
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">Course Description</h3>
              <Button variant="ghost" size="sm" className="bg-primary/20 hover:bg-primary/30">
                Edit Description
              </Button>
            </div>
            <p className="text-muted-foreground">
              {course.description}
            </p>
          </div>

          <Separator />

          <div>
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">Course Image</h3>
              <Button variant="ghost" size="sm">
                Edit Image
              </Button>
            </div>
            <div className="aspect-video rounded-lg border overflow-hidden">
              <Image
                src={course.thumbnail}
                alt="Course thumbnail"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
