import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Loader } from 'lucide-react'
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { isAdmin } from '@/lib/auth/is-admin'
import ThemeToggle from '../theme/theme-toggle'

export default async function Header() {
  const user = await currentUser()

  return (
    <header className="flex sticky top-0 z-50 bg-background items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            className="w-[28px] h-[28px] object-contain"
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
        <ul className="hidden md:flex items-center gap-1">
          <li>
            <Link href="/">
              <Button variant="ghost">主页</Button>
            </Link>
          </li>
          <li>
            <Link href="/question">
              <Button variant="ghost">题目列表</Button>
            </Link>
          </li>
        </ul>

        <ThemeToggle />
        <ClerkLoading>
          <div className="flex items-center justify-center w-[60px]">
            <Loader className="animate-spin" />
          </div>
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <div className="flex items-center justify-center w-[60px]">
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
