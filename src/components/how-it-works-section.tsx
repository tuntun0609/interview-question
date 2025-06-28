import React from 'react'
import { Search, Play, BookOpen } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

const steps = [
  {
    key: 'step1',
    title: '选择领域',
    description: '选择你想要练习的技术领域和难度级别',
    icon: Search,
    color: 'bg-blue-500 text-white',
  },
  {
    key: 'step2',
    title: '开始练习',
    description: '开始答题练习，支持模拟面试环境',
    icon: Play,
    color: 'bg-green-500 text-white',
  },
  {
    key: 'step3',
    title: '查看解析',
    description: '查看详细解析和参考答案，深入理解',
    icon: BookOpen,
    color: 'bg-purple-500 text-white',
  },
]

export default function HowItWorksSection() {
  return (
    <section className="bg-muted/50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-balance md:text-4xl lg:text-5xl">
            简单三步，开启面试准备
          </h2>
          <p className="text-muted-foreground mt-4 text-lg text-balance">
            智能化的学习流程，让面试准备更高效
          </p>
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
                    <h3 className="mb-4 text-xl font-semibold">{step.title}</h3>

                    {/* 描述 */}
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
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
