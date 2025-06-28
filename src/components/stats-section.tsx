import React from 'react'
import { FileText, Users, TrendingUp, Building } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

const stats = [
  {
    key: '题目总数',
    valueKey: '50,000+',
    icon: FileText,
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    key: '注册用户',
    valueKey: '100,000+',
    icon: Users,
    color: 'text-green-600 dark:text-green-400',
  },
  {
    key: '通过率',
    valueKey: '85%',
    icon: TrendingUp,
    color: 'text-purple-600 dark:text-purple-400',
  },
  {
    key: '合作企业',
    valueKey: '500+',
    icon: Building,
    color: 'text-orange-600 dark:text-orange-400',
  },
]

export default function StatsSection() {
  return (
    <section className="bg-primary/5 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-balance md:text-4xl lg:text-5xl">
            用户信赖的选择
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map(stat => {
            const Icon = stat.icon
            return (
              <Card
                key={stat.key}
                className="group border-0 bg-white/60 text-center backdrop-blur-sm transition-all duration-300 hover:bg-white/80 hover:shadow-lg dark:bg-gray-900/60 dark:hover:bg-gray-900/80"
              >
                <CardContent className="p-8">
                  {/* 图标 */}
                  <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>

                  {/* 数值 */}
                  <div className="mb-2 text-3xl font-bold md:text-4xl">{stat.valueKey}</div>

                  {/* 标签 */}
                  <p className="text-muted-foreground font-medium">{stat.key}</p>

                  {/* 装饰线 */}
                  <div className="from-primary/50 to-primary mx-auto mt-4 h-1 w-12 rounded-full bg-gradient-to-r transition-all duration-300 group-hover:w-16" />
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* 底部装饰 */}
        <div className="mt-16 text-center">
          <div className="via-primary/20 mx-auto h-px w-32 bg-gradient-to-r from-transparent to-transparent" />
        </div>
      </div>
    </section>
  )
}
