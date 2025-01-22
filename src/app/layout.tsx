import { zhCN } from '@clerk/localizations'
import { ClerkProvider } from '@clerk/nextjs'
import NextTopLoader from 'nextjs-toploader'

import Footer from '@/components/footer'
import Header from '@/components/header'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { ThemeProvider } from '@/components/theme'
import { Toaster } from '@/components/ui/sonner'

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '前端面试宝典',
  description: '前端面试宝典',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider localization={zhCN}>
      <html lang="en" suppressHydrationWarning>
        <body>
          <NextTopLoader color="#7c3aed" zIndex={51} showSpinner={false} />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="">
              <Header />
              <main className="min-h-[calc(100vh-64px)]">{children}</main>
              <Footer />
            </div>
            <Toaster />
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
