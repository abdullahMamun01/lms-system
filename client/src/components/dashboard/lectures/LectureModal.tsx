"use client";
import { LectureForm } from "@/components/forms/LectureForm";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function LectureModal({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button >{children}</button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-2xl p-6 h-auto max-h-[90vh] overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-900 mt-4 ml-8">Add New Lecture</h2>
        <LectureForm />
      </DialogContent>
    </Dialog>
  );
}
