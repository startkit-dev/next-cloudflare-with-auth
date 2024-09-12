import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle"
import { Lucia } from "lucia"

import { db } from "@/drizzle/client"
import { sessionsTable, usersTable } from "@/drizzle/schema"
import { env } from "@/env/server"

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: DatabaseUserAttributes
  }
}

interface DatabaseUserAttributes {
  email: string
  avatarUrl: string | null
  name: string | null
}

const adapter = new DrizzleSQLiteAdapter(db, sessionsTable, usersTable)

export const lucia = new Lucia(adapter, {
  getUserAttributes: (attributes) => {
    return {
      avatarUrl: attributes.avatarUrl,
      email: attributes.email,
      name: attributes.name
    }
  },
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: env.NODE_ENV === "production"
    },
    expires: false
  }
})
