import { z } from "zod";


const ModuleSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});



export { ModuleSchema };
