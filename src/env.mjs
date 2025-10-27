import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
  /*
   * ServerSide Environment variables, not available on the client.
   */
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),

    // Hacemos NEXTAUTH_SECRET opcional para build y solo obligatorio en runtime si se requiere
    NEXTAUTH_SECRET: z.string().optional(),

    // NEXTAUTH_URL opcional en build, se valida en runtime
    NEXTAUTH_URL: z.preprocess(
      (str) => process.env.VERCEL_URL ?? str ?? process.env.NEXTAUTH_URL ?? "http://localhost:3000",
      z.string().optional()
    ),

    // email
    SMTP_HOST: z.string().optional(),
    SMTP_PORT: z.string().optional(),
    SMTP_USER: z.string().optional(),
    SMTP_PASSWORD: z.string().optional(),
    SMTP_FROM_EMAIL: z.string().email().optional(),

    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
  },

  /*
   * Environment variables available on the client (and server).
   */
  client: {
    NEXT_PUBLIC_APP_NAME: z.string().optional(),
    NEXT_PUBLIC_GOOGLE_MAP_API_KEY: z.string().optional(),
  },

  // Habilitamos lectura dinámica desde process.env en runtime
  runtimeEnv: process.env,
});
