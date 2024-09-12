import { GitHub } from "arctic"
import { z } from "zod"

import { env } from "@/env/server"

const githubUserSchema = z.object({
  avatarUrl: z.string().url(),
  email: z.string(),
  id: z.number(),
  login: z.string(),
  name: z.string().nullable().optional()
})

const userResponseSchema = githubUserSchema
  .omit({ avatarUrl: true, email: true })
  .extend({
    avatar_url: z.string().url(),
    email: z.string().optional().nullable()
  })

export const github = new GitHub(env.GITHUB_CLIENT_ID, env.GITHUB_CLIENT_SECRET)

export async function authorizeGithub(code: string) {
  const tokens = await github.validateAuthorizationCode(code)
  const githubUserResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`
    }
  })

  const userResponse = userResponseSchema.parse(await githubUserResponse.json())

  /**
   * If we don't get an email from the user via the auth request, we need to
   * fetch it separately
   */
  if (!userResponse.email) {
    userResponse.email = await getUserEmail(tokens.accessToken)
  }

  return githubUserSchema.parse({
    ...userResponse,
    avatarUrl: userResponse.avatar_url
  })
}

const emailResponseSchema = z.array(
  z.object({
    email: z.string(),
    primary: z.boolean()
  })
)

async function getUserEmail(accessToken: string) {
  const emailsResponse = await fetch("https://api.github.com/user/emails", {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  const emails = emailResponseSchema.parse(await emailsResponse.json())
  const primaryEmail = emails.find(
    (email: { primary: boolean }) => email.primary
  )

  return primaryEmail?.email
}
