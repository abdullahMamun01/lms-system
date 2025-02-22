import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { deleteCourse } from "@/services/course.service";
import useAuth from "@/store/auth.store";
import toast from "react-hot-toast";
import { Spinner } from "../ui/spinner";

export default function DeleteCourseModal({
  children,
  courseId,
}: {
  children: React.ReactNode;
  courseId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteCourse(courseId, token as string);
      toast.success("course deleting success");
      setIsLoading(false);
      setIsOpen(false)
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you absolutely sure want to delete courses?
          </DialogTitle>
        </DialogHeader>

        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            color="red"
            className=""
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>

          <Button color="red" className="bg-red-600" onClick={handleDelete}>
            {isLoading ? (
              <span className="flex ga-2 ">
                <Spinner /> deleting...
              </span>
            ) : (
              <span>delete</span>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
