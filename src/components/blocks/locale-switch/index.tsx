'use client'

import { Check, ChevronDown, Languages } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useLocale } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { cn } from '@/lib/utils'

const localeNames = {
  zh: '中文',
  en: 'English',
}

export const LocaleSwitch = ({ className }: { className?: string }) => {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()

  const handleLanguageChange = (nextLocale: string) => {
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: nextLocale, scroll: false }
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className={cn('flex items-center gap-2', className)}>
          <Languages className="h-4 w-4" />
          {localeNames[locale as keyof typeof localeNames] || locale}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[120px] p-1">
        {routing.locales.map(lang => (
          <Button
            key={lang}
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={() => handleLanguageChange(lang)}
          >
            <Check className={cn('h-4 w-4', locale === lang ? 'opacity-100' : 'opacity-0')} />
            {localeNames[lang as keyof typeof localeNames] || lang}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  )
}
