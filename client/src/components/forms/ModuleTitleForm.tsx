import React, { useState } from "react";
import { Input } from "../ui/input";

import useAuth from "@/store/auth.store";
import toast from "react-hot-toast";
import SubmitBtn from "../auth/SubmitBtn";
import { updateModuleById } from "@/services/moduleService";
import { useParams } from "next/navigation";

interface Props {
  title: string;
  onUpdate: (title: string) => void;
}

export default function ModuleTitleForm({ title, onUpdate }: Props) {
  const { moduleId } = useParams();
  const { token } = useAuth();
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateTitle = async () => {
    if (!updatedTitle && !moduleId) return;
    setIsLoading(true);
    try {
      await updateModuleById(moduleId as string, updatedTitle, token as string);
      setIsLoading(false);
      toast.success("course moudle updated successfully");
      onUpdate(updatedTitle);
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4">
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
