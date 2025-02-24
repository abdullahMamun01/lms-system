"use client";

import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Fragment, useEffect } from "react";
import LectureList from "@/components/lectures/LectureList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { getModuleAndLessionsByCourseId } from "@/services/course.service";
import { useFetch } from "@/hooks/useFetch";
import useAuth from "@/store/auth.store";
import LoadingSpinner from "../LoadingSpinner";

import { ICourseModule, IModule } from "@/interfaces/module.interface";

import SearchInput from "./SearchInput";
import { ILecture } from "@/interfaces/lecture.inteface";
import { useModuleLectureStore } from "@/store/moduleLecture.store";

export default function LectureSidebar({ courseId }: { courseId: string }) {
  const { setModules, modules } = useModuleLectureStore();
  const { token } = useAuth();

  const { data, isLoading } = useFetch<ICourseModule>(
    () => getModuleAndLessionsByCourseId(courseId, token as string),
    [token]
  );

  useEffect(() => {
    if (!isLoading && data) {
      setModules(data.modules as IModule[]);
    }
  }, [isLoading, data , setModules]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const lectures =
    data?.modules
      ?.flatMap((module) => module.lectures)
      .filter((lecture) => lecture?.completed) || [];
  const totalCompleteModule = data?.modules?.filter(
    (module) =>
      module.lectures?.every(
        (lecture) => Boolean(lecture?.completed) === true
      ) && module.lectures?.length > 0
  );

  console.log({ totalCompleteModule });
  console.log(totalCompleteModule);
  return (
    <div className="bg-[#1A1B2E] rounded-lg p-4">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>Running Module:</div>

          <div className="flex justify-center items-center gap-2">
            <Progress value={10} className="w-32 bg-primary/20" />
            <div className="text-right">{totalCompleteModule?.length}/13</div>
          </div>
        </div>
        <SearchInput lectures={lectures as ILecture[]} />

        <ScrollArea className="h-[500px]">
          <div className="space-y-4">
            <div className="bg-[#2A2B3E] p-4 rounded-lg">
              <h3 className="text-primary/70 font-medium mb-2">
                {data?.course}
              </h3>
              <div className="text-sm text-gray-400">5h 2m • 1/31</div>
            </div>
            <div className="space-y-2">
              <div className="space-y-2 pl-1">
                {modules?.map((module) => (
                  <Fragment key={module._id}>
                    <Accordion
                      type="single"
                      collapsible
                      defaultValue="item-1"
                      className="w-full  rounded-lg bg-[#2A2B3E] px-3"
                    >
                      <AccordionItem
                        value={`item-${module.moduleNumber}`}
                        className="border-none "
                      >
                        <AccordionTrigger className="no-underline hover:no-underline ">
                          <h4 className="font-medium">
                            Module {module.moduleNumber}: {module.title}
                          </h4>
                          <div className="text-sm text-gray-400">
                            1h 54m • 1/13
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-3">
                          {module?.lectures && (
                            <LectureList lectures={module.lectures} />
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
