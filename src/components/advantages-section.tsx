import React from 'react'
import { Brain, BookOpen, RefreshCw, Users } from 'lucide-react'

import { Card, CardContent, CardHeader } from '@/components/ui/card'

const advantages = [
  {
    key: 'aiPowered',
    title: 'AI智能推荐',
    description: '根据你的水平和薄弱环节，智能推荐合适的题目',
    icon: Brain,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    key: 'comprehensive',
    title: '题库全面',
    description: '涵盖各大互联网公司真题，题库持续扩充',
    icon: BookOpen,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    key: 'realtime',
    title: '实时更新',
    description: '紧跟技术发展趋势，题目内容实时更新',
    icon: RefreshCw,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    key: 'community',
    title: '社区讨论',
    description: '与其他求职者交流经验，分享面试心得',
    icon: Users,
    gradient: 'from-orange-500 to-red-500',
  },
]

export default function AdvantagesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-balance md:text-4xl lg:text-5xl">
            为什么选择我们
          </h2>
          <p className="text-muted-foreground mt-4 text-lg text-balance">
            专业的面试准备平台，助你求职路上一臂之力
          </p>
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
                  <h3 className="text-xl font-semibold">{advantage.title}</h3>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {advantage.description}
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
