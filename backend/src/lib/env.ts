import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string().default('file:./dev.db'),
  JWT_SECRET: z.string().min(8).default('change-me-in-development'),
  PORT: z.coerce.number().default(3333)
});

export const env = envSchema.parse(process.env);
