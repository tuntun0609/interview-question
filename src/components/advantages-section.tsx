import React from 'react'
import { Brain, BookOpen, RefreshCw, Users } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Card, CardContent, CardHeader } from '@/components/ui/card'

const advantages = [
  {
    key: 'aiPowered' as const,
    icon: Brain,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    key: 'comprehensive' as const,
    icon: BookOpen,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    key: 'realtime' as const,
    icon: RefreshCw,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    key: 'community' as const,
    icon: Users,
    gradient: 'from-orange-500 to-red-500',
  },
]

export default function AdvantagesSection() {
  const t = useTranslations('advantages')

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-balance md:text-4xl lg:text-5xl">{t('title')}</h2>
          <p className="text-muted-foreground mt-4 text-lg text-balance">{t('description')}</p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {advantages.map(advantage => {
            const Icon = advantage.icon
            return (
              <Card
                key={advantage.key}
                className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50 shadow-lg transition-all duration-300 hover:shadow-xl dark:from-gray-900 dark:to-gray-800"
              >
                <CardHeader className="text-center">
                  <div
                    className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${advantage.gradient}`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{t(advantage.key)}</h3>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {advantage.key === 'aiPowered' && t('aiPoweredDescription')}
                    {advantage.key === 'comprehensive' && t('comprehensiveDescription')}
                    {advantage.key === 'realtime' && t('realtimeDescription')}
                    {advantage.key === 'community' && t('communityDescription')}
                  </p>
                </CardContent>

                {/* 装饰性渐变背景 */}
                <div
                  className={`absolute -top-12 -right-12 h-24 w-24 rounded-full bg-gradient-to-br ${advantage.gradient} opacity-10 transition-all duration-300 group-hover:opacity-20`}
                />
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
