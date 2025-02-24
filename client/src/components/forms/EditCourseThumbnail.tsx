import React, { useState } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import { ImagePlus } from "lucide-react";
import toast from "react-hot-toast";
import { updateCourse } from "@/services/course.service";
import useAuth from "@/store/auth.store";
import SubmitBtn from "../auth/SubmitBtn";
interface Props {
  thumnail: string;
  courseId: string;
  onUpdate: (
    field: "title" | "description" | "thumbnail",
    value: string
  ) => void;
}
export default function EditCourseThumbnail({
  courseId,
  thumnail,
  onUpdate,
}: Props) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  const handleUpdateTitle = async () => {
    if(!imageFile) return
    const formData = new FormData();
    formData.append("file", imageFile);
    setIsLoading(true);
    try {
      const {data : {data: {thumbnail}}} = await updateCourse(courseId, formData, token as string);
      setIsLoading(false);
      toast.success("course updated successfully");
      onUpdate("thumbnail", thumbnail);
    
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
   
    if (file) {
      const reader = new FileReader();
      setImageFile(file)
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-4">
        {imagePreview ? (
          <div className="relative aspect-video rounded-lg overflow-hidden border">
            <Image
              src={imagePreview}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <>
            <div className="relative aspect-video rounded-lg overflow-hidden border">
              <Image
                src={thumnail}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-dashed rounded-lg text-muted-foreground hover:bg-muted/50 cursor-pointer">
              <ImagePlus className="w-8 h-8" />
              <p className="text-sm">
                Click or drag and drop to upload thumbnail
              </p>
            </div>
          </>
        )}

        <div className="space-y-4 mt-4">
          <label htmlFor="" className="text-sm text-gray-700">
            Course Price
          </label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="cursor-pointer"
          />
        </div>
        <SubmitBtn
          handleClick={handleUpdateTitle}
          isLoading={isLoading}
          loadingText="updating..."
          className="bg-primary/20 hover:bg-primary/30  text-secondary"
        >
          update Title
        </SubmitBtn>
      </div>
    </div>
  );
}
