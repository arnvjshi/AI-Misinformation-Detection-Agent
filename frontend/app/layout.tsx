import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "VeriCrisis",
  description: "AI agent that detects, verifies, and corrects misinformation related to global and local crises. The agent will operate as a backend service using FastAPI, leverage Perplexity and Google's Gemini 2.0 Flash for verification, and use Supabase for data persistence.",
  generator: "arnv",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <SiteHeader />
          <main className="mx-auto w-full max-w-6xl px-4 py-8">{children}</main>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
