import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function Header() {
  return (
    <header className="flex sticky top-0 z-50 bg-background items-center justify-between h-16 px-4 border-b border-gray-200">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.svg" alt="logo" width={28} height={28} />
        <span className="text-lg font-bold">前端面试题库</span>
      </Link>
      <nav>
        <ul className="flex items-center gap-4">
          <li>
            <Link href="/">
              <Button variant="ghost">主页</Button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
