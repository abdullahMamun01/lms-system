import { z } from "zod";

const courseSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.string().min(1, {
    message: "Price is required",
  }),
  image: z.instanceof(FileList).refine(
    (files) => {
      if (files.length === 0) {
        return false; // No file selected
      }

      const file = files[0];
      const allowedTypes = ["image/jpeg", "image/png"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        return false;
      }

      if (file.size > maxSize) {
        return false;
      }

      return true;
    },
    {
      message: "File is required. Allowed types: jpeg, png. Max size: 5MB.",
    }
  ),
});



export {
    courseSchema
}