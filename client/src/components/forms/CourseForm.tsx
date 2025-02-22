"use client";

import type React from "react";

import { useState } from "react";
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import SubmitBtn from "../auth/SubmitBtn";
import ControlledInput from "./ControlledInput";
import { ICourseSchema } from "@/interfaces/course.interface";
import { courseSchema } from "@/zod/course.schema";
import { addCourse } from "@/services/course.service";
import useAuth from "@/store/auth.store";
import toast from "react-hot-toast";

export default function CourseForm() {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<ICourseSchema>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;
  const onSubmit = async (formData: ICourseSchema) => {
    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price.toString());
    if (formData.image && formData.image.length > 0) {
      data.append("file", formData.image[0]);
    }
    setLoading(true);
    try {
      await addCourse(data, token as string);
      setLoading(false);
      toast.success('course added successfully')
    } catch (error) {
        const err = error as Error

        console.log(err.message)
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-8 md:grid-cols-2">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Provide the fundamental details of your course
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <label htmlFor="" className="text-sm text-gray-700">
                Course Title
              </label>
              <ControlledInput
                control={form.control}
                name="title"
                type="text"
                placeholder="enter course title"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="space-y-4">
              <label htmlFor="" className="text-sm text-gray-700">
                Course description
              </label>
              <textarea
                {...form.register("description")}
                placeholder="Enter course description "
                className="p-4 border-2 border-gray-200 rounded-lg "
                style={{ width: "100%", height: "100%" }}
                rows={8}
              ></textarea>
              {errors && (
                <span className="text-red-500 text-xs mt-2">
                  {errors?.description?.message}
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Media and Pricing */}
        <Card>
          <CardHeader>
            <CardTitle>Media & Pricing</CardTitle>
            <CardDescription>
              Add course thumbnail and set the price
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <label>Course Thumbnail</label>
              <div className="flex flex-col gap-4">
                {imagePreview ? (
                  <div className="relative aspect-video rounded-lg overflow-hidden border">
                    <Image
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-dashed rounded-lg text-muted-foreground hover:bg-muted/50 cursor-pointer">
                    <ImagePlus className="w-8 h-8" />
                    <p className="text-sm">
                      Click or drag and drop to upload thumbnail
                    </p>
                  </div>
                )}

                <div className="space-y-4 mt-4">
                  <label htmlFor="" className="text-sm text-gray-700">
                    Course Price
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    {...form.register("image", {
                      required: "Image is required", // Make it a required field
                      validate: (files) =>
                        (files && files.length > 0) ||
                        "You must select an image",
                    })}
                    onChange={handleImageChange}
                    className="cursor-pointer"
                  />
                </div>
              </div>
              {errors && (
                <span className="text-red-500 text-xs mt-2">
                  {errors?.image?.message}
                </span>
              )}
            </div>

            <div className="space-y-4">
              <label htmlFor="" className="text-gray-700">
                Price
              </label>
              <ControlledInput
                control={form.control}
                name="price"
                type="number"
                placeholder="enter course price"
                className="w-full p-2 border rounded"
              />
            </div>
          </CardContent>
        </Card>

        {/* Course Details */}
      </div>

      <div className="flex gap-4">
        <SubmitBtn
          isLoading={loading}
          loadingText="creating..."
          className="w-auto bg-primary hover:bg-primary/90 text-white"
        >
          create course
        </SubmitBtn>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/dashboard/courses")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
