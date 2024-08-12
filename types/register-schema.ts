import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(4, {
        message: "Name is required"
    }),
    email: z.string().email({
        message: "Invalid Email address"
    }),
    password: z.string().min(6, {
        message: "Password is required"
    }),
    code: z.optional(z.string())
});