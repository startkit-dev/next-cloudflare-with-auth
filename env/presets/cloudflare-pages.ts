import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

/**
 * Cloudflare Pages Environment Variables
 * @see https://developers.cloudflare.com/pages/configuration/build-configuration/#environment-variables
 */
export const cloudflarePages = () =>
  createEnv({
    experimental__runtimeEnv: process.env,
    server: {
      CF_PAGES: z.string().optional(),
      CF_PAGES_BRANCH: z.string().optional(),
      CF_PAGES_COMMIT_SHA: z.string().optional(),
      CF_PAGES_URL: z.string().url().optional()
    }
  })
