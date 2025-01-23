'use client'

import { useRef, useState } from 'react'
import { Check, Clipboard } from 'lucide-react'

export const CopyCodeButton = ({ code }: { code: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const timer = useRef<number>(-1)
  const [isCopied, setIsCopied] = useState(false)

  const copyCode = () => {
    if (!code) {
      return
    }
    // 将文本内容复制到剪贴板
    navigator.clipboard.writeText(code)
    setIsCopied(true)
    clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  return (
    <div
      ref={ref}
      onClick={copyCode}
      className="absolute right-3 top-[calc(1rem_+_2px)] hidden cursor-pointer rounded-sm group-hover:block"
    >
      {isCopied ? (
        <Check className="text-green-400" size="20" />
      ) : (
        <Clipboard className="transition-colors duration-200 hover:text-gray-300" size="20" />
      )}
    </div>
  )
}
