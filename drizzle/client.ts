import { drizzle } from "drizzle-orm/d1"

import { env } from "@/env/server"

export const db = drizzle(env.DB, {
  logger: env.NODE_ENV === "development"
})
