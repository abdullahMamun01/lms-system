import React, { useState } from "react";

import toast from "react-hot-toast";
import { updateCourse } from "@/services/course.service";
import useAuth from "@/store/auth.store";
import SubmitBtn from "../auth/SubmitBtn";
interface Props {
  description: string;
  courseId: string;
  onUpdate: (
    field: "title" | "description" | "thumbnail",
    value: string
  ) => void;
}

export default function EditCourseDescriptionForm({
  courseId,
  description,
  onUpdate,
}: Props) {
  const { token } = useAuth();
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateDescription = async () => {
    setIsLoading(true);
    try {
      await updateCourse(
        courseId,
        { description: updatedDescription },
        token as string
      );
      setIsLoading(false);
      toast.success("course updated successfully");
      onUpdate("description", updatedDescription);
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-2 justify-between mb-2">
        <textarea
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            setUpdatedDescription(event.target.value)
          }
          defaultValue={description}
          placeholder="Enter your course description"
          className="w-full p-4 h-full border border-gray-300"
          rows={8}
        ></textarea>
        <SubmitBtn
          handleClick={handleUpdateDescription}
          isLoading={isLoading}
          loadingText="updating..."
          className="bg-primary/20 hover:bg-primary/30 w-full text-secondary"
        >
          update description
        </SubmitBtn>
      </div>
    </div>
  );
}
