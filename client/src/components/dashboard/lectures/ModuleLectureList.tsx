/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { GripVertical, Pencil, Plus, Trash, Video } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import LectureModal from "./LectureModal";
import { ILecture } from "@/interfaces/lecture.inteface";
import { useLectureStore } from "@/store/lecture.stores";
import { useCallback } from "react";
import DeleteLectureModal from "./DeleteLectureModal";

export default function ModuleLectureList() {
  const { setLecture, lectures: lectureList } = useLectureStore();
  const handleEditLecture = useCallback((lecture: ILecture) => {
    setLecture(lecture);
  }, []);

  return (
    <div className="w-2/4 ml-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-md bg-emerald-50">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-emerald-600"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M8 6h13" />
                  <path d="M8 12h13" />
                  <path d="M8 18h13" />
                  <path d="M3 6h.01" />
                  <path d="M3 12h.01" />
                  <path d="M3 18h.01" />
                </svg>
              </div>
              <CardTitle>Module Lessons</CardTitle>
            </div>
            <LectureModal>
              <button className="flex items-center gap-2">
                <Plus className="h-4 w-4 mr-2" />
                Add a chapter
              </button>
            </LectureModal>
          </div>
        </CardHeader>
        <CardContent>
          {lectureList?.map((lecture) => (
            <div className="space-y-2" key={lecture.id}>
              {/* Lesson Items */}
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg group">
                <GripVertical className="h-5 w-5 text-muted-foreground/40 invisible group-hover:visible" />
                <div className="flex-1 flex items-center gap-2">
                  <Video />
                  <span className="line-clamp-1">{lecture.title}</span>
                </div>
                <div className="flex items-center gap-4">
                  <DeleteLectureModal>
                    <button onClick={() => handleEditLecture(lecture)}>
                      <Trash className="text-red-400 w-4 h-4" />
                    </button>
                  </DeleteLectureModal>
                  <LectureModal>
                    <button
                      onClick={() => handleEditLecture(lecture)}
                      className="flex items-center gap-2 "
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                  </LectureModal>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
