
import { z } from 'zod';

export const watchLectureSchema = z.object({
    state: z.enum(['STARTED', 'COMPLETED'])
  });
  

