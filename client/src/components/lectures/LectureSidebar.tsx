
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";

import { Fragment } from "react";
import LectureList from "@/components/lectures/LectureList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { modules } from "@/app/(Main)/courses/[id]/lectures/data";

export default function LectureSidebar() {
    const modulesData = modules;
    
  return (
    <div className="bg-[#1A1B2E] rounded-lg p-4">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>Running Module:</div>

          <div className="flex justify-center items-center gap-2">
            <Progress value={10} className="w-32 bg-primary/20" />
            <div className="text-right">1/13</div>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            className="pl-9 bg-[#2A2B3E] border-0"
            placeholder="Search Lesson"
          />
        </div>
        <ScrollArea className="h-[500px]">
          <div className="space-y-4">
            <div className="bg-[#2A2B3E] p-4 rounded-lg">
              <h3 className="text-primary/70 font-medium mb-2">
                Crash Course On Node-Express-Mongoose
              </h3>
              <div className="text-sm text-gray-400">5h 2m • 1/31</div>
            </div>
            <div className="space-y-2">
              <div className="space-y-2 pl-1">
                {modulesData.map((module) => (
                  <Fragment key={module.id}>
                    <Accordion
                      type="single"
                      collapsible
                      defaultValue="item-1"
                      className="w-full  rounded-lg bg-[#2A2B3E] px-3"
                    >
                      <AccordionItem
                        value={`item-${module.moduleNo}`}
                        className="border-none "
                      >
                        <AccordionTrigger className="no-underline hover:no-underline ">
                          <h4 className="font-medium">
                            Module {module.moduleNo}: {module.title}
                          </h4>
                          <div className="text-sm text-gray-400">
                            1h 54m • 1/13
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-3">
                          <LectureList lectures={module.lessons} />
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
