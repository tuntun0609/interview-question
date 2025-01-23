import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { Loader } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { isAdmin } from '@/lib/auth/is-admin'

import ThemeToggle from '../theme/theme-toggle'
import { Button } from '../ui/button'

export default async function Header() {
  const user = await currentUser()

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-background px-4 dark:border-gray-800">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            className="h-[28px] w-[28px] object-contain"
            src="/logo.svg"
            alt="logo"
            width={28}
            height={28}
          />
          <span className="text-lg font-bold">前端面试宝</span>
        </Link>
        {isAdmin(user) && (
          <Link href="/dashboard">
            <Button variant="ghost">后台</Button>
          </Link>
        )}
      </div>
      <nav className="flex items-center gap-1">
        <ul className="flex items-center gap-1">
          <li>
            <Link href="/question">
              <Button variant="ghost">题目列表</Button>
            </Link>
          </li>
        </ul>

        <ThemeToggle />
        <ClerkLoading>
          <div className="flex w-[60px] items-center justify-center">
            <Loader className="animate-spin" />
          </div>
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <div className="flex w-[60px] items-center justify-center">
              <UserButton />
            </div>
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">
              <Button>登录</Button>
            </Link>
          </SignedOut>
        </ClerkLoaded>
      </nav>
    </header>
  )
}
