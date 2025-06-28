import React from 'react'
import { Search, Play, BookOpen } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Card, CardContent } from '@/components/ui/card'

const steps = [
  {
    key: 'step1' as const,
    icon: Search,
    color: 'bg-blue-500 text-white',
  },
  {
    key: 'step2' as const,
    icon: Play,
    color: 'bg-green-500 text-white',
  },
  {
    key: 'step3' as const,
    icon: BookOpen,
    color: 'bg-purple-500 text-white',
  },
]

export default function HowItWorksSection() {
  const t = useTranslations('howItWorks')

  return (
    <section className="bg-muted/50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-balance md:text-4xl lg:text-5xl">{t('title')}</h2>
          <p className="text-muted-foreground mt-4 text-lg text-balance">{t('description')}</p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.key} className="relative">
                {/* 连接线 */}
                {index < steps.length - 1 && (
                  <div className="from-muted-foreground/20 to-muted-foreground/5 absolute top-16 left-1/2 hidden h-0.5 w-full bg-gradient-to-r md:block" />
                )}

                <Card className="relative border-2 text-center">
                  <CardContent className="p-8">
                    {/* 步骤数字 */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${step.color} text-sm font-bold`}
                      >
                        {index + 1}
                      </div>
                    </div>

                    {/* 图标 */}
                    <div className="bg-primary/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
                      <Icon className="text-primary h-8 w-8" />
                    </div>

                    {/* 标题 */}
                    <h3 className="mb-4 text-xl font-semibold">{t(step.key)}</h3>

                    {/* 描述 */}
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.key === 'step1' && t('step1Description')}
                      {step.key === 'step2' && t('step2Description')}
                      {step.key === 'step3' && t('step3Description')}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
