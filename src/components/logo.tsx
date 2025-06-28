import Link from 'next/link'

import Icon from './icon'

export const Logo = () => {
  return (
    <Link
      aria-label="home"
      className="text-primary flex items-center gap-2 text-2xl whitespace-nowrap lg:mx-4"
      href="/"
    >
      <Icon className="h-8 w-8" />
      面试宝
    </Link>
  )
}
