import type { Metadata } from "next"
import "./globals.css"
import { Footer, Layout, Navbar } from "@/components"
import React from "react"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "Challenge",
  description: "Created by Hyorran"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <Navbar />
        </header>
        <Layout>
          <Providers>{children}</Providers>
        </Layout>
      </body>
    </html>
  )
}
