import { z } from 'zod'

export const passangerDetailSchema = z.object({
  fullName: z.string(),
  age: z.string(),
  gender: z.enum(['Male','Female','Other']),
  contact: z.string().regex(/^[6-9]\d{9}$/,{message:"Please enter a valid phone number."})
});
