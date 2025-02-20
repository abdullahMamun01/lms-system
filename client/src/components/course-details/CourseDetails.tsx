import { Play, Star, Clock, Calendar, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function CourseDetails() {
  return (
    <div className="min-h-screen bg-gray-50 mt-10">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Course Info */}
          <div className="lg:col-span-2">
            <Badge variant="secondary" className="mb-4">
              Live Class
            </Badge>
            <h1 className="mb-4 text-3xl font-bold">
              App Development with Flutter
            </h1>

            <div className="mb-6 flex items-center gap-2">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-semibold">4.9</span>
              </div>
              <span className="text-gray-600">(293 Ratings)</span>
            </div>

            <p className="mb-6 text-gray-600">
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
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt="DART MasterClass Preview"
                    fill
                    className="w-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-16 w-16 rounded-full bg-white/90 text-black hover:bg-white"
                    >
                      <Play className="h-8 w-8 fill-current" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Course Features */}
        <div className="mt-12 grid gap-6 md:grid-cols-5">
          {[
            { title: "Batch Start", value: "February 28" },
            {
              title: "Live Class",
              value: "9:00 PM - 10:30 PM (Wed, Sat, Sun)",
            },
            {
              title: "Intern Support",
              value: "16 hours a day, 6 days a week support",
            },
            { title: "Missed Classes", value: "23 classes" },
            { title: "Enrollment Ongoing", value: "In Batch 1024" },
          ].map((item, index) => (
            <div key={index} className="rounded-lg bg-white p-4 shadow-sm">
              <h3 className="mb-2 text-sm font-medium text-gray-500">
                {item.title}
              </h3>
              <p className="text-sm font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
