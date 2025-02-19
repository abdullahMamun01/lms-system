import { z } from "zod";


const courseModuleSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});



export { courseModuleSchema };
