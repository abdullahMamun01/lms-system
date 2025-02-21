import { Play, Star, Clock, Calendar, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import CourseFeatures from "./CourseFeatures";
import ReactCourse from "../../../public/assets/React.jpg";
export default function CourseDetails() {
  return (
    <div className=" bg-gray-50 pb-16">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Course Info */}
          <div className="lg:col-span-2">
            <Badge
              variant="secondary"
              className="mb-4 bg-primary/20 text-primary/90 px-3 py-1"
            >
              Live Class
            </Badge>
            <h1 className="mb-4 text-3xl font-bold">
              App Development with Flutter
            </h1>

            <div className="mb-6 flex items-center gap-2">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-semibold text-secondary">4.9</span>
              </div>
              <span className="text-secondary">(293 Ratings)</span>
            </div>

            <p className="mb-6 text-secondary/80">
              In one course, you will learn everything about development. You
              will learn everything from basic to advanced level through 72 live
              classes and 140 pre-recorded videos. Along with that, you will get
              technical support, regular support, job placement support, and
              lifetime access to all resources!
            </p>

            <div className="mb-8">
              <Button
                size="lg"
                className="bg-primary/90 text-gray-50 hover:bg-primary"
              >
                Admit to this course
                <span className="ml-2 text-lg font-bold">$99</span>
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {[
                { icon: BookOpen, text: "86 Live Classes" },
                { icon: Calendar, text: "38 Projects" },
                { icon: Clock, text: "7 Days Backup" },
                { icon: Play, text: "140 Pre-recorded Videos" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <item.icon className="h-5 w-5 text-green-500" />
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Video Preview */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <Image
                  src={ReactCourse}
                  alt="DART MasterClass Preview"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover object-center"
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Course Features */}
        <CourseFeatures />
      </div>
    </div>
  );
}
