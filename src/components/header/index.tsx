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

export default function Header() {
  return (
    <header className="flex sticky top-0 z-50 bg-background items-center justify-between h-16 px-4 border-b border-gray-200">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.svg" alt="logo" width={28} height={28} />
        <span className="text-lg font-bold">前端面试宝</span>
      </Link>
      <nav>
        <ul className="flex items-center gap-1">
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
          <ClerkLoading>
            <Loader className="animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in">
                <Button>登录</Button>
              </Link>
            </SignedOut>
          </ClerkLoaded>
        </ul>
      </nav>
    </header>
  )
}
