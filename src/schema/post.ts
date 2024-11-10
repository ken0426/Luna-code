import { Timestamp } from 'firebase/firestore';
import { z } from 'zod';

export const postSchema = z.object({
  text: z.string().min(1),
  createdAt: z.custom<Timestamp>((val) => val instanceof Timestamp),
  id: z.string().min(1),
  userId: z.string().min(1),
});

export type PostSchemaType = z.infer<typeof postSchema>;
