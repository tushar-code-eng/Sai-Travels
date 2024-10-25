import { z } from 'zod'

export const phoneNoCorrectness = z
    .string()
    .regex(/^[6-9]\d{9}$/,{message:"Please enter a valid phone number."})


export const emailCorrectness = z
    .string()
    .regex(/.+\@.+\..+/,{message:"Please enter a valid email address."})