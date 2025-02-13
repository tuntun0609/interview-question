'use client'
import { Dispatch, useEffect, useRef, useState } from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

function useHeadsObserver(): [string, Dispatch<string>] {
  const observer = useRef<IntersectionObserver>(null)
  const [activeId, setActiveId] = useState('')
  const intersectingHeadings = useRef<
    {
      id: string
      top: number
    }[]
  >([])

  useEffect(() => {
    const articleElement = document.getElementsByClassName('markdown-body')

    if (!articleElement) {
      return
    }

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          intersectingHeadings.current.push({
            id: entry.target.id,
            top: (entry.target as HTMLHeadingElement).offsetTop,
          })
          intersectingHeadings.current.sort((a, b) => b.top - a.top)
        } else {
          intersectingHeadings.current = intersectingHeadings.current.filter(
            heading => heading.id !== entry.target.id
          )
        }
      })

      if (intersectingHeadings.current.length) {
        setActiveId(intersectingHeadings.current[intersectingHeadings.current.length - 1].id)
      }
    }

    observer.current = new IntersectionObserver(handleObserver, { rootMargin: '-64px 0px 0px 0px' })
    document.querySelectorAll('h1[id], h2[id], h3[id], h4[id]').forEach(element => {
      observer.current?.observe(element)
    })
    return () => {
      observer.current?.disconnect()
    }
  }, [])

  return [activeId, setActiveId]
}

const TOC = () => {
  const [headings, setHeadings] = useState<{ text: string; id: string; level: string }[]>([])
  const [activeId] = useHeadsObserver()

  useEffect(() => {
    const [articleElement] = document.getElementsByClassName('markdown-body')

    if (!articleElement) {
      return
    }

    const extractedHeadings = Array.from(
      articleElement.querySelectorAll('h1[id], h2[id], h3[id], h4[id]')
    ).map(heading => ({
      text: heading.textContent || '',
      id: heading.id || '',
      level: heading.nodeName,
    }))

    setHeadings(extractedHeadings)
  }, [])

  return (
    <>
      <ul className="sticky right-0 top-16 mt-6">
        {headings.map(({ text, id, level }) => (
          <li
            key={id}
            className={cn(
              'my-2',
              level === 'H2' && 'pl-4',
              level === 'H3' && 'pl-6',
              level === 'H4' && 'pl-8',
              activeId === id && 'text-purple-400'
            )}
          >
            <Link
              href={`#${id}`}
              className="link-hover break-words transition-colors duration-150 hover:text-purple-300"
            >
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default TOC
