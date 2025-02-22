"use client";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

import VideoPlay from "@/components/lectures/VideoPlay";
import { modules } from "../data";
import { use } from "react";
import navigateToLession from "@/utils/navigateToLession";
import { usePathname, useRouter } from "next/navigation";

export default function LectureVideoPage({
  params,
}: {
  params: Promise<{ lectureId: string }>;
}) {
  const { lectureId } = use(params);
  const allModules = modules;
  const lessions = allModules.flatMap((module) => module.lessons);
  const playableLesson = lessions.find((lesson) => lesson.id === lectureId);
  const startToNextLession = lessions.findIndex(
    (lesson) => lesson.id === lectureId
  );
  const nextLession = lessions.slice(
    startToNextLession + 1,
    startToNextLession + 2
  );
  const prevLession = lessions.slice(
    startToNextLession - 1,
    startToNextLession
  )

  const pathName = usePathname();
  const router = useRouter();
  const nextLessionNavigate = () => {
    navigateToLession(nextLession[0].id, pathName, router);
  };



  const prevLessionNavigate = () => {

      navigateToLession(prevLession[0].id, pathName, router);
    
  };

  return (
    <div className="md:col-span-2 space-y-4 z-10">
      <div className="flex items-center gap-2">
        <Button variant="ghost" className="text-primary/70">
          <ChevronDown className="h-4 w-4 mr-2" />
          1-1 How The Web Works
        </Button>
      </div>
      {playableLesson && <VideoPlay videoUrl={playableLesson.videoUrl} />}
      <div className="flex justify-end gap-5">
        <Button onClick={prevLessionNavigate} className="bg-secondary text-gray-100">Previous</Button>
        <Button onClick={nextLessionNavigate} className="px-8">Next</Button>
      </div>
    </div>
  );
}
