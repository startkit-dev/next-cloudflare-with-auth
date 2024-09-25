import type { PropsWithChildren } from "react"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"


export const runtime = "edge"

export default function LoginLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
