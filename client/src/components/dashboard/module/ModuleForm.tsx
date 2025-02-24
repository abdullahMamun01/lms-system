"use client";
import SubmitBtn from "@/components/auth/SubmitBtn";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { addModuleByCourse } from "@/services/moduleService";
import useAuth from "@/store/auth.store";
import { BookOpen, Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ModuleForm() {
  const { courseId } = useParams();
  const { token } = useAuth();
  const [isAddModule, setIsAddModule] = useState(false);
  const [moduleTitle, setModuleTitle] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleAddModule = async () => {
    setIsLoading(true);
    try {
      if (moduleTitle && courseId) {
        await addModuleByCourse(
          courseId as string,
          moduleTitle,
          token as string
        );
        setIsLoading(false);
        toast.success("module added succesfully");
        setIsAddModule(false)
      }
    } catch (error) {
      const err = error as Error;

      setIsLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <CardContent className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex justify-between w-full">
          <h2 className="text-lg font-semibold">Course Modules</h2>
          <Button
            size="sm"
            className="text-secondary/70 bg-primary/70"
            onClick={() => setIsAddModule(!isAddModule)}
          >
            {isAddModule ? (
              <>
                <X /> cancel
              </>
            ) : (
              <>
                <Plus className="" /> Add Module
              </>
            )}
          </Button>
        </div>
      </div>
      {isAddModule && (
        <div className=" flex w-full justify-between items-center gap-2">
          <Input
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setModuleTitle(event.target.value)
            }
            placeholder="e.g. 'Introduction to the course...'"
            className="w-full"
          />
          <SubmitBtn
            handleClick={handleAddModule}
            size="sm"
            isLoading={isLoading}
            loadingText="creating..."
            className="my-auto w-1/4 px-4"
          >
            Create
          </SubmitBtn>
        </div>
      )}
    </CardContent>
  );
}
