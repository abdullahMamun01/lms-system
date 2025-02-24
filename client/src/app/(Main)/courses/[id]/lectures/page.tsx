import { Button } from "@/components/ui/button";
import { getCourseById } from "@/services/course.service";
import {  ChevronDown } from "lucide-react";
import Image from "next/image";


export default async function LecturePage({params} : {params : Promise<{id: string}>}) {
  const {id} = await params
  const response = await getCourseById(id)
  const course =  response.data

  return (
    <div className="md:col-span-2 space-y-4 z-10">
      <div className="flex items-center gap-2">
        <Image width={500} height={500}  src={course.thumbnail} alt={course.title} className="w-full h-full  object-contain rounded-lg" />
      </div>
      <div>
        <h1 className="text-gray-100 font-bold text-2xl mt-4">{course.title}</h1>
        <p className="text-gray-400 mt-4 line-clamp-2">{course.description}</p>
      </div>
     
    </div>
  );
}
