import { and, eq } from "drizzle-orm"

import { db } from "@/drizzle/client"
import { oauthAccountsTable, usersTable } from "@/drizzle/schema"

interface OAuthUserAttributes {
  id: string | number
  email: string
  name?: string | null
  avatarUrl?: string | null
}

/**
 * Find or create the user from the OAuth provider.
 *
 * @example
 * ```ts
 * import { findOrCreateUserFromOAuth } from "@/lib/auth/find-or-create-user-from-oauth"
 *
 * const githubUser = await authorizeGithub(code)
 * const userId = await findOrCreateUserFromOAuth("github",
 *  githubUser.id
 * )
 * ```
 *
 * @returns the user ID of the user
 */
export async function findOrCreateUserFromOAuth(
  providerId: string,
  { id: providerUserId, email, name, avatarUrl }: OAuthUserAttributes
) {
  const [existingAccount] = await db
    .select()
    .from(oauthAccountsTable)
    .where(
      and(
        eq(oauthAccountsTable.providerId, providerId),
        eq(oauthAccountsTable.providerUserId, providerUserId.toString())
      )
    )
    .limit(1)

  if (existingAccount) {
    const [user] = await db
      .update(usersTable)
      .set({
        avatarUrl: avatarUrl ?? undefined,
        email,
        name: name ?? undefined
      })
      .where(eq(usersTable.id, existingAccount.userId))
      .returning()

    if (!user) {
      throw new Error(
        `Failed to find user for OAuth account: ${providerId}: '${providerUserId}'`
      )
    }

    return user
  }

  const [user] = await db
    .insert(usersTable)
    .values({
      avatarUrl,
      email,
      name: name ?? null
    })
    .onConflictDoUpdate({
      set: {
        avatarUrl: avatarUrl ?? undefined,
        email,
        name: name ?? undefined
      },
      target: [usersTable.email]
    })
    .returning()

  if (!user) {
    throw new Error(
      `Failed to create user for OAuth account: ${providerId}: '${providerUserId}'`
    )
  }

  await db.insert(oauthAccountsTable).values({
    providerId,
    providerUserId: providerUserId.toString(),
    userId: user.id
  })

  return user
}
