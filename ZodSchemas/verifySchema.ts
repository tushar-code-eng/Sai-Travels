import {z} from 'zod'

export const verifySchema = z.object({
    code: z.string().min(6,"verify code must be of 6 characters")
})