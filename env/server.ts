import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

import { env as shared } from "./shared"

export const env = createEnv({
  experimental__runtimeEnv: process.env,
  extends: [shared],
  server: {
    /**
     * Cloudflare Env Vars
     */
    CF_PAGES_COMMIT_SHA: z.string().default("unknown"),
    CF_PAGES_URL: z.string().url().optional(),

    /**
     *
     */
    DATABASE_URL: z.string().url(),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string()
  }
})
