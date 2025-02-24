"use client";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

import VideoPlay from "@/components/lectures/VideoPlay";
import { use } from "react";
import navigateToLession from "@/utils/navigateToLession";
import { usePathname, useRouter } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import useAuth from "@/store/auth.store";
import {
  getLectureById,
  lectureMarkedAsComplete,
} from "@/services/lectureService";
import { ILectureWithProgress } from "@/interfaces/lecture.inteface";
import VideoSkelaton from "@/components/skeleton/VideoSkelaton";
import { useModuleLectureStore } from "@/store/moduleLecture.store";
import PdfList from "@/components/lectures/PdfList";

export default function LectureVideoPage({
  params,
}: {
  params: Promise<{ lectureId: string }>;
}) {
  const { modules, setModules } = useModuleLectureStore();
  const pathName = usePathname();
  const router = useRouter();
  const { lectureId } = use(params);
  const { token } = useAuth();
  const { data, isLoading } = useFetch<ILectureWithProgress>(
    () => getLectureById(lectureId, token as string),
    [token, router, pathName, lectureId]
  );
  if (isLoading) {
    return <VideoSkelaton />;
  }
  const nextLessionNavigate = async () => {
    navigateToLession(data?.nextLession as string, pathName, router);
    const updateModules = modules.map((module) => {
      if (module.lectures) {
        return {
          ...module,
          lectures: module.lectures.map((lecture) => {
            if (lecture._id === lectureId) {
              return {
                ...lecture,
                completed: true,
              };
            }
            return lecture;
          }),
        };
      }
      return module;
    });
    setModules(updateModules);

    lectureMarkedAsComplete(lectureId, token as string)
      .then(() => {
        console.log("Lecture marked as complete");
      })
      .catch((error) => {
        console.error("Failed to mark lecture as complete:", error);
      });
  };

  const prevLessionNavigate = () => {
    if (data?.previousLession) {
      navigateToLession(data?.previousLession, pathName, router);
    }
  };

  return (
    <div className="md:col-span-2 space-y-4 z-10">
      <div className="flex items-center gap-2">
        <Button variant="ghost" className="text-primary/70">
          <ChevronDown className="h-4 w-4 mr-2" />
          {data?.title}
        </Button>
      </div>
      {data && (
        <VideoPlay lectureId={lectureId as string} videoUrl={data.videoUrl} />
      )}

      <div className="flex justify-end gap-5 mr-4">
        <Button
          disabled={!data?.previousLession}
          onClick={prevLessionNavigate}
          className="bg-secondary hover:bg-secondary/90 text-gray-100"
        >
          Previous
        </Button>
        <Button onClick={nextLessionNavigate} className="px-8">
          Next
        </Button>
      </div>

      {data?.pdfNotes && data?.pdfNotes?.length > 0 && (
        <PdfList pdfNotes={data?.pdfNotes as string[]} />
      )}
    </div>
  );
}
