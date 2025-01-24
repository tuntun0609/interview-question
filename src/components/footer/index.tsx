import Link from 'next/link'

import { siteConfig } from '@/config'

export default function Footer() {
  return (
    <footer className="relative z-50 flex h-16 items-center border-t border-gray-200 bg-background px-4 dark:border-gray-800">
      <span className="text-sm text-gray-500">
        Copyright © {new Date().getFullYear()}{' '}
        <Link href={siteConfig.personalWebsite} target="_blank">
          tuntun
        </Link>
      </span>
    </footer>
  )
}
