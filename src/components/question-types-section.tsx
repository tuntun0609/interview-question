import React from 'react'
import { Code, Database, Globe, Cpu, Server, Network } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const questionTypes = [
  {
    key: 'frontend',
    title: '前端开发',
    description: 'React、Vue、JavaScript、CSS等前端技术面试题',
    icon: Code,
    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  {
    key: 'backend',
    title: '后端开发',
    description: 'Java、Python、Node.js等后端技术面试题',
    icon: Server,
    color: 'bg-green-500/10 text-green-600 dark:text-green-400',
  },
  {
    key: 'algorithm',
    title: '算法数据结构',
    description: '数据结构、算法、编程题等核心基础题目',
    icon: Cpu,
    color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  },
  {
    key: 'system',
    title: '系统设计',
    description: '高并发、分布式、微服务等架构设计题',
    icon: Globe,
    color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  },
  {
    key: 'database',
    title: '数据库',
    description: 'MySQL、Redis、MongoDB等数据库相关题目',
    icon: Database,
    color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
  },
  {
    key: 'network',
    title: '计算机网络',
    description: 'TCP/IP、HTTP、网络安全等网络基础题',
    icon: Network,
    color: 'bg-red-500/10 text-red-600 dark:text-red-400',
  },
]

export default function QuestionTypesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-balance md:text-4xl lg:text-5xl">
            丰富的题目类型
          </h2>
          <p className="text-muted-foreground mt-4 text-lg text-balance">
            覆盖前端、后端、算法等多个技术领域
          </p>
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
                  <h3 className="text-xl font-semibold">{type.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {type.description}
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
