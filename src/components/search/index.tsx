/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { ReactElement, useDeferredValue, useEffect, useRef, useState } from 'react'
import { addBasePath } from 'next/dist/client/add-base-path'
import { useRouter } from 'next/navigation'

function useMounted(): boolean {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}

export async function importPagefind() {
  window.pagefind = await import(/* webpackIgnore: true */ addBasePath('/_pagefind/pagefind.js'))
  await window.pagefind!.options({
    baseUrl: '/',
    // ... more search options
  })
}

export type PagefindSearchOptions = {
  /** If set, this call will load all assets but return before searching. Prefer using pagefind.preload() instead */
  preload?: boolean
  /** Add more verbose console logging for this search query */
  verbose?: boolean
  /** The set of filters to execute with this search. Input type is extremely flexible, see the filtering docs for details */
  filters?: object
  /** The set of sorts to use for this search, instead of relevancy */
  sort?: object
}

type PagefindResult = {
  excerpt: string
  meta: {
    title: string
  }
  raw_url: string
  sub_results: {
    excerpt: string
    title: string
    url: string
  }[]
  url: string
}

type SearchProps = {
  emptyResult?: ReactElement | string
  errorText?: ReactElement | string
  loading?: ReactElement | string
  placeholder?: string
  className?: string
  searchOptions?: PagefindSearchOptions
}

const INPUTS = new Set(['INPUT', 'SELECT', 'BUTTON', 'TEXTAREA'])

const DEV_SEARCH_NOTICE = (
  <>
    <p>
      Search isn&apos;t available in development because Nextra&nbsp;4 uses Pagefind package, which
      indexes built `.html` files instead of `.md`/`.mdx`.
    </p>
    <p className="mt-2">
      To test search during development, run `next build` and then restart your app with `next dev`.
    </p>
  </>
)

export default function Search() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<ReactElement | string>('')
  const [results, setResults] = useState<PagefindResult[]>([])
  const [search, setSearch] = useState('')
  const deferredSearch = useDeferredValue(search)

  useEffect(() => {
    const handleSearch = async (value: string) => {
      if (!value) {
        setResults([])
        setError('')
        return
      }

      if (!window.pagefind) {
        setIsLoading(true)
        setError('')
        try {
          await importPagefind()
        } catch (error) {
          const message =
            error instanceof Error
              ? process.env.NODE_ENV !== 'production' && error.message.includes('Failed to fetch')
                ? DEV_SEARCH_NOTICE // This error will be tree-shaked in production
                : `${error.constructor.name}: ${error.message}`
              : String(error)
          setError(message)
          setIsLoading(false)
          return
        }
      }
      const response = await window.pagefind!.debouncedSearch<PagefindResult>(value, {})
      if (!response) return

      const data = await Promise.all(response.results.map(o => o.data()))

      console.log(
        data.map(newData => ({
          ...newData,
          sub_results: newData.sub_results.map(r => {
            const url = r.url.replace(/\.html$/, '').replace(/\.html#/, '#')

            return { ...r, url }
          }),
        }))
      )

      setResults(
        data.map(newData => ({
          ...newData,
          sub_results: newData.sub_results.map(r => {
            const url = r.url.replace(/\.html$/, '').replace(/\.html#/, '#')

            return { ...r, url }
          }),
        }))
      )
      setIsLoading(false)
    }
    handleSearch(deferredSearch)
  }, [deferredSearch])

  const router = useRouter()
  const [focused, setFocused] = useState(false)
  const mounted = useMounted()
  const inputRef = useRef<HTMLInputElement>(null!)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const el = document.activeElement
      if (!el || INPUTS.has(el.tagName) || (el as HTMLElement).isContentEditable) {
        return
      }
      if (
        event.key === '/' ||
        (event.key === 'k' &&
          !event.shiftKey &&
          (navigator.userAgent.includes('Mac') ? event.metaKey : event.ctrlKey))
      ) {
        event.preventDefault()
        // prevent to scroll to top
        inputRef.current.focus({ preventScroll: true })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
  return (
    <div>
      <input onChange={e => setSearch(e.target.value)} />
    </div>
  )
}
