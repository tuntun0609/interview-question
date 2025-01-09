import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { zhCN } from '@clerk/localizations'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Toaster } from '@/components/ui/sonner'

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
      <html lang="en">
        <body>
          <div className="">
            <Header />
            <main className="min-h-[calc(100vh-64px)]">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
