import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

// Optimized font loading with display swap and preloading
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "ABDELHAMID - Full Stack Developer & IT Solutions",
  description:
    "Professional portfolio of ABDELHAMID - Full Stack Developer specializing in modern web technologies and IT solutions",
  generator: "v0.app",
  keywords: ["Full Stack Developer", "Web Development", "Next.js", "React", "TypeScript"],
  authors: [{ name: "ABDELHAMID" }],
  openGraph: {
    title: "ABDELHAMID - Full Stack Developer",
    description: "Professional portfolio showcasing web development projects and skills",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${inter.variable} antialiased`}
      >
        <Suspense fallback={
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        }>
          {children}
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
