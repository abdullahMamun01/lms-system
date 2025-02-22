import {

    BookOpen
  } from "lucide-react";
  
  
  
  import { Alert, AlertDescription } from "@/components/ui/alert";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  import { Button } from "@/components/ui/button";
  import { Card, CardContent } from "@/components/ui/card";
  import { Input } from "@/components/ui/input";
  import DashboardCourseCard from "@/components/dashboard/DashboardCourseCard";
import { getCourseById } from "@/services/course.service";

  interface Props {
    params: Promise<{ courseId: string }>;
}
  
  export default async function CourseManagePage({params} : Props) {
    const {courseId} = await params
    const response = await getCourseById(courseId)
    const course = response.data
   
    return (
  
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1">
              <Alert className="bg-yellow-50 border-yellow-200">
                <AlertDescription>
                  This course is unpublished. It will not be visible in the
                  course. 
                </AlertDescription>
              </Alert>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="default">Publish</Button>
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>US</AvatarFallback>
              </Avatar>
            </div>
          </div>
  
          <div className="grid grid-cols-2 gap-8">
            {/* Left Column */}
           <DashboardCourseCard course={course}/>
  
            {/* Right Column */}
            <div className="space-y-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <h2 className="text-lg font-semibold">Course Modules</h2>
                  </div>
  
                  <div className="space-y-4">
                    <Input
                      placeholder="e.g. 'Introduction to the course...'"
                      className="w-full"
                    />
                    <Button >Create</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
  
    );
  }
  