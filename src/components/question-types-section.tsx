import React from 'react'
import { Code, Database, Globe, Cpu, Server, Network } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const questionTypes = [
  {
    key: 'frontend' as const,
    icon: Code,
    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  {
    key: 'backend' as const,
    icon: Server,
    color: 'bg-green-500/10 text-green-600 dark:text-green-400',
  },
  {
    key: 'algorithm' as const,
    icon: Cpu,
    color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  },
  {
    key: 'system' as const,
    icon: Globe,
    color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  },
  {
    key: 'database' as const,
    icon: Database,
    color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
  },
  {
    key: 'network' as const,
    icon: Network,
    color: 'bg-red-500/10 text-red-600 dark:text-red-400',
  },
]

export default function QuestionTypesSection() {
  const t = useTranslations('questionTypes')

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-balance md:text-4xl lg:text-5xl">{t('title')}</h2>
          <p className="text-muted-foreground mt-4 text-lg text-balance">{t('description')}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {questionTypes.map(type => {
            const Icon = type.icon
            return (
              <Card
                key={type.key}
                className="group hover:border-primary/20 relative overflow-hidden border-2 transition-all duration-300 hover:shadow-lg"
              >
                <CardHeader className="pb-4">
                  <div className={`inline-flex w-fit rounded-lg p-3 ${type.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">{t(type.key)}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {type.key === 'frontend' && t('frontendDescription')}
                    {type.key === 'backend' && t('backendDescription')}
                    {type.key === 'algorithm' && t('algorithmDescription')}
                    {type.key === 'system' && t('systemDescription')}
                    {type.key === 'database' && t('databaseDescription')}
                    {type.key === 'network' && t('networkDescription')}
                  </p>
                  <Badge variant="secondary" className="mt-4">
                    热门
                  </Badge>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
