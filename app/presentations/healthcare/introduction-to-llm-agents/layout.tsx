import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Introduction to LLMs, Workflows & AI Agents",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
