import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),

    // NEXTAUTH_SECRET opcional para build, obligatorio en runtime si existe
    NEXTAUTH_SECRET: z.string().optional(),

    // NEXTAUTH_URL opcional, con placeholder válido para build
    NEXTAUTH_URL: z.preprocess(
      (str) => process.env.NEXTAUTH_URL ?? str ?? "https://placeholder.local",
      z.string().url()
    ),

    SMTP_HOST: z.string().optional(),
    SMTP_PORT: z.string().optional(),
    SMTP_USER: z.string().optional(),
    SMTP_PASSWORD: z.string().optional(),
    SMTP_FROM_EMAIL: z.string().email().optional(),

    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_APP_NAME: z.string().optional(),
    NEXT_PUBLIC_GOOGLE_MAP_API_KEY: z.string().optional(),
  },
  runtimeEnv: process.env,
});
