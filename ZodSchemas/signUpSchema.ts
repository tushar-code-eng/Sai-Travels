import { z } from 'zod'

export const signUpSchema = z.object({
    fullName:z.string(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "password must be of atleast 6 characters" })
})