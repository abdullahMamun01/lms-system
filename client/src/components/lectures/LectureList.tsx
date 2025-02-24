"use client";
import { ILecture } from "@/interfaces/lecture.inteface";
import navigateToLession from "@/utils/navigateToLession";
import { CheckCircle2, Lock } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function LectureList({ lectures }: { lectures: ILecture[] }) {
  const router = useRouter();
  const pathname = usePathname();
console.log({lectures})
  return (
    <div>
      {lectures.map((lecture, i) => (
        <button
          key={lecture.id}
          disabled={i > 0 && !lecture.completed}
          onClick={() =>
            navigateToLession(lecture._id as string, pathname, router)
          }
          className={`flex items-center gap-3 w-full text-left p-2 rounded hover:bg-gray-700/30 transition-colors
           `}
        >
          {lecture.completed ? (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          ) : (
            <div className="h-6 w-6 rounded-full border-2 flex  justify-center items-center border-red-500/40">
              <Lock className="text-red-500/40 w-3 h-3" />
            </div>
          )}
          <div className="flex-1">
            <div className="text-sm">{lecture.title}</div>
            <div className="text-xs text-gray-400">{lecture.duration}</div>
          </div>
        </button>
      ))}
    </div>
  );
}
