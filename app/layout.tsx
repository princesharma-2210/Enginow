import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
// import { PageTransition } from "@/components/ui/page-transition" // optional if using transitions

// ✅ Fonts
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

// ✅ Metadata
export const metadata: Metadata = {
  title: "Enginow - Learn Fast, Understand Better",
  description:
    "Educational platform for engineering students and learners of Computer Science/IT-related subjects",
  generator: "v0.dev",
}

// ✅ Root Layout with Clerk
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col">
              {/* ✅ Navbar always visible */}
              <Navbar />

              {/* ✅ Main content area */}
              <main className="flex-1">
                {/* <PageTransition>{children}</PageTransition> */}
                {children}
              </main>

              {/* ✅ Footer */}
              <Footer />
            </div>

            {/* ✅ Toast notifications */}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
