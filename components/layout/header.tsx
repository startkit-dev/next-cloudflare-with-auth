import Link from "next/link"

import { Button } from "@/components/ui/button"
import { env } from "@/env/shared"
import { cn } from "@/lib/utils/cn"

import type { HTMLProps } from "react"

type Props = HTMLProps<HTMLDivElement>

export function Header({ className, ...props }: Props) {
  const target = env.NODE_ENV === "production" ? "Cloudflare" : "localhost"

  return (
    <header className={cn("w-full", className)} {...props}>
      <div className="container flex items-center justify-center gap-4 p-2">
        <Button className="gap-2 font-mono text-sm" variant="ghost" asChild>
          <Link
            href="https://pages.cloudflare.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="relative flex size-3">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-orange-500"></span>
            </span>
            Deployed to {target}
          </Link>
        </Button>
      </div>
    </header>
  )
}
