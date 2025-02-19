import { z } from "zod";

const courseSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  price: z
    .union([z.string(), z.number()])
    .transform((val) => {
      const numVal = typeof val === "string" ? Number(val) : val;
      return numVal;
    })
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "Price must be a non-negative number",
    }),
  description: z.string().min(1, { message: "Description is required" }),
});

const updateCourseSchema = courseSchema.partial();

export { courseSchema, updateCourseSchema };
