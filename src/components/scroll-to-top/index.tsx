'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

import { cn } from '@/lib/utils'

const ScrollTopButton = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 50) {
        setShow(true)
      } else {
        setShow(false)
      }
    }

    window.addEventListener('scroll', handleWindowScroll)
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div
      className={cn(
        'fixed bottom-20 right-8 hidden flex-col gap-3 transition-opacity duration-150 md:flex',
        show ? 'md:opacity-100' : 'pointer-events-none cursor-default md:opacity-0'
      )}
    >
      <button
        aria-label="Scroll To Top"
        onClick={handleScrollTop}
        className="rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
      >
        <ArrowUp />
      </button>
    </div>
  )
}

export default ScrollTopButton
