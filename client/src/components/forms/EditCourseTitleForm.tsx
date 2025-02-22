import React, { useState } from "react";
import { Input } from "../ui/input";

import useAuth from "@/store/auth.store";
import { updateCourse } from "@/services/course.service";
import toast from "react-hot-toast";
import SubmitBtn from "../auth/SubmitBtn";

interface Props {
  title: string;
  courseId: string;
  onUpdate: (field: 'title' | 'description' | 'thumbnail', value: string) => void;
}

export default function EditCourseTitleForm({
  courseId,
  title,
  onUpdate,
}: Props) {
  const { token } = useAuth();
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateTitle = async () => {
    setIsLoading(true);
    try {
      await updateCourse(courseId, { title: updatedTitle }, token as string);
      setIsLoading(false);
      toast.success("course updated successfully");
      onUpdate('title' , updatedTitle);
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
      setIsLoading(false)
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-2 gap-2">
        <Input

          className="w-full p-2 border rounded"
          placeholder="Enter you course title"
          defaultValue={title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setUpdatedTitle(event.target.value)
          }
        />

        <SubmitBtn
          handleClick={handleUpdateTitle}
          isLoading={isLoading}
          loadingText="updating..."
          className="bg-primary/20 hover:bg-primary/30 w-1/5 text-secondary"
        >
          update Title 
        </SubmitBtn>
      </div>
    </div>
  );
}
