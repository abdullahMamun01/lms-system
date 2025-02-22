import { Button } from "@/components/ui/button";
import {  ChevronDown } from "lucide-react";


export default async function LecturePage() {

  
  return (
    <div className="md:col-span-2 space-y-4 z-10">
      <div className="flex items-center gap-2">
        <Button variant="ghost" className="text-primary/70">
          <ChevronDown className="h-4 w-4 mr-2" />
          1-1 How The Web Works
        </Button>
      </div>
     
    </div>
  );
}
