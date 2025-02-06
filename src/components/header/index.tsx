import { Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { siteConfig } from '@/config'

// import Search from '../search'
import ThemeToggle from '../theme/theme-toggle'
import { Button } from '../ui/button'

export default async function Header() {
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
      </div>
      <nav className="flex items-center gap-1">
        <ul className="flex items-center">
          {/* <li>
            <Search />
          </li> */}
          <li>
            <Link href="/question">
              <Button variant="ghost">题目列表</Button>
            </Link>
          </li>
          <li>
            <Link target="_blank" href={siteConfig.githubUrl}>
              <Button variant="ghost">
                <Github />
              </Button>
            </Link>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
        {/* <ClerkLoading>
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
        </ClerkLoaded> */}
      </nav>
    </header>
  )
}
