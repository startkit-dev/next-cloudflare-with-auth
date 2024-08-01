import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { logout } from "@/lib/auth/actions/logout"
import { getSession } from "@/lib/auth/get-session"
import Image from "next/image"
import Link from "next/link"
import logo from "../icon4.png"

export default async function Home() {
  const { user } = await getSession()

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <Link className="group flex flex-row items-center gap-2" href="/">
          <Image
            className="group-hover:-rotate-12 aspect-square transition-all group-hover:scale-105 dark:invert"
            src={logo}
            alt="StartKit logo"
            width={42}
            height={42}
            priority
          />
          <span className="font-extrabold font-mono text-3xl">StartKit</span>
        </Link>

        <div className="flex flex-col items-center gap-4">
          {user ? (
            <form action={logout}>
              <Button
                type="submit"
                className="flex h-10 items-center justify-center rounded-full border border-black/[.08] border-solid px-4 text-sm transition-colors hover:border-transparent hover:bg-[#f2f2f2] sm:h-12 sm:min-w-44 sm:px-5 sm:text-base dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
              >
                Sign out
              </Button>
            </form>
          ) : (
            <a
              className="flex h-10 items-center justify-center rounded-full border border-black/[.08] border-solid px-4 text-sm transition-colors hover:border-transparent hover:bg-[#f2f2f2] sm:h-12 sm:min-w-44 sm:px-5 sm:text-base dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
              href="/login/github"
            >
              Login
            </a>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
