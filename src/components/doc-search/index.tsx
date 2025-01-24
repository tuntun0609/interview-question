'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { DocSearchModal, useDocSearchKeyboardEvents } from '@docsearch/react'
import { Search } from 'lucide-react'
import Link from 'next/link'

import { Button } from '../ui/button'

import '@docsearch/css'

export default function CustomDocSearch() {
  const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
  const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
  const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME

  const [isOpen, setIsOpen] = useState(false)
  const [isMac, setIsMac] = useState(false)
  const searchButtonRef = useRef<HTMLButtonElement>(null)

  const onOpen = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    searchButtonRef: searchButtonRef as any,
  })

  // 添加检测操作系统的效果
  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0)
  }, [])

  if (!appId || !apiKey || !indexName) {
    return null
  }

  return (
    <div className="flex flex-row items-center gap-2">
      <Button
        variant="outline"
        className="hidden gap-2 rounded-2xl md:flex"
        data-variant="large"
        onClick={onOpen}
      >
        <span className="hidden gap-1 md:flex">
          搜索文档<kbd className="hidden md:block">{isMac ? '⌘K' : 'Ctrl+K'}</kbd>
        </span>

        <Search size={16} />
      </Button>
      <Button variant="ghost" className="p-0 px-2 md:hidden" data-variant="small" onClick={onOpen}>
        <Search size={22} />
      </Button>
      {isOpen &&
        createPortal(
          <DocSearchModal
            initialScrollY={window.scrollY}
            appId={appId}
            apiKey={apiKey}
            indexName={indexName}
            onClose={onClose}
            placeholder="搜索文档"
            hitComponent={({ hit, children }) => <Link href={hit.url}>{children}</Link>}
          />,
          document.body
        )}
    </div>
  )
}
