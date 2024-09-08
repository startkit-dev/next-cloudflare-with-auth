import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

import { cloudflarePages } from "./presets/cloudflare-pages"

export const env = createEnv({
  extends: [cloudflarePages()],
  runtimeEnv: {
    NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
    NODE_ENV: process.env.NODE_ENV
  },
  shared: {
    NEXT_PUBLIC_HOST: z.string().url().optional(),
    NODE_ENV: z
      .enum(["test", "development", "production"])
      .default("development")
  }
})
