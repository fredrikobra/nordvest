import type React from "react"
import "./globals.css"
import { Outfit } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" })

export const metadata = {
  title: "Sokom Bygg - Eksperter på byggesøknader",
  description: "Vi hjelper deg med byggesøknader - enkelt og greit",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="no" suppressHydrationWarning>
      <body className={`${outfit.className} ${outfit.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
