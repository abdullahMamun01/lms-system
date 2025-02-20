
import { z } from 'zod';

export const watchLectureSchema = z.object({
    state: z.enum(['STARTED', 'COMPLETED']),
    lecture: z.string().min(1, 'Lecture is required'),
    module: z.string().min(1, 'Module is required'),
  });
  

