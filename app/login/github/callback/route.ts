import { OAuth2RequestError } from "arctic"
import { cookies } from "next/headers"

import { findOrCreateUserFromOAuth } from "@/lib/auth/find-or-create-user-from-oauth"
import { lucia } from "@/lib/auth/lucia"
import { authorizeGithub } from "@/lib/auth/providers/github"
import { validateOauthCallback } from "@/lib/auth/validate-oauth-callback"

export const runtime = "edge"

export async function GET(req: Request): Promise<Response> {
  const code = validateOauthCallback(req)
  if (!code) {
    return new Response(null, {
      status: 400
    })
  }

  try {
    const githubUser = await authorizeGithub(code)
    const user = await findOrCreateUserFromOAuth("github", githubUser)
    const session = await lucia.createSession(user.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )
    return new Response(null, {
      headers: {
        Location: "/"
      },
      status: 302
    })
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400
      })
    }

    return new Response(null, {
      status: 500
    })
  }
}
