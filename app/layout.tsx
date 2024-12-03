import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CommandMenu } from "@/components/command-menu"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Personal Website",
  description: "A modern, minimalist personal website",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <CommandMenu />
        {children}
      </body>
    </html>
  )
}

