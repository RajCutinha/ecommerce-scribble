import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email({
        message: "Invalid Email address"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    }),
    code: z.optional(z.string())
});