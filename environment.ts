import { z } from "zod";

export const envSchema = z.object({
    POSTGRES_DATABASE: z.string()
});

envSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}