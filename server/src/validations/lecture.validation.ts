import { z } from "zod";

const lectureSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  videoUrl: z.string().url({ message: "Invalid URL format" }),
});

const updateLectureSchema = lectureSchema.partial();

export { lectureSchema, updateLectureSchema };
