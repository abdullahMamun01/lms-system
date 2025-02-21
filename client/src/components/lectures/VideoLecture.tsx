import React from "react";
import { Button } from "../ui/button";
import { BookOpen, ChevronDown } from "lucide-react";

export default function VideoLecture() {
  return (
    <div className="md:col-span-2 space-y-4 z-10">
      <div className="flex items-center gap-2">
        <Button variant="ghost" className="text-primary/70">
          <ChevronDown className="h-4 w-4 mr-2" />
          1-1 How The Web Works
        </Button>
      </div>
      <div className="aspect-video bg-black rounded-lg relative">
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/50 flex items-center px-4">
          <div className="flex items-center gap-4 text-sm">
            <Button size="icon" variant="ghost">
              <BookOpen className="h-4 w-4" />
            </Button>
            <span>0:01 / 8:13</span>
          </div>
        </div>
      </div>
    </div>
  );
}
