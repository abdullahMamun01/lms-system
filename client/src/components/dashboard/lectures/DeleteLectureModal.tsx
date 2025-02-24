import SubmitBtn from "@/components/auth/SubmitBtn";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteLecture } from "@/services/lectureService";
import useAuth from "@/store/auth.store";
import { useLectureStore } from "@/store/lecture.stores";
import { ReactNode, useState } from "react";
import toast from "react-hot-toast";
export default function DeleteLectureModal({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  const { selectedLecture, removeLecture, setLectures, lectures } =
    useLectureStore();

  const handleDeleteLecture = async () => {
    setIsLoading(true);
    try {
      await deleteLecture(selectedLecture?.id as string, token as string);
      const updateLectures = lectures.filter(
        (lecture) => lecture.id != selectedLecture?.id
      );
      setLectures(updateLectures);
      setIsLoading(false);
      toast.success("lecture deleted successfully");
      removeLecture()
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
      setIsLoading(false);
      removeLecture()
    }

  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button>{children}</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Lecture</DialogTitle>
          <DialogDescription>
            are your sure do you want to delete this lecture?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4"></div>
        <DialogFooter>
          <SubmitBtn
            isLoading={isLoading}
            loadingText="delete..."
            handleClick={handleDeleteLecture}
            className="bg-red-400 hover:bg-red-500"
            size="sm"
          >
            delete
          </SubmitBtn>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
