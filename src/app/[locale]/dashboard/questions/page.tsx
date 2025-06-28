import { Plus, Search, Filter } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { getQuestions } from '@/service/questions'

import { QuestionsTable } from './table'

export default async function QuestionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const questions = await getQuestions()
  const { locale } = await params

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">题目管理</h1>
          <p className="text-muted-foreground">管理和查看系统中的所有面试题目</p>
        </div>
        <Button asChild>
          <Link href={`/${locale}/dashboard/questions/add`}>
            <Plus className="mr-2 h-4 w-4" />
            添加题目
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>搜索和筛选</CardTitle>
          <CardDescription>使用下方工具快速找到您需要的题目</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
                <Input placeholder="搜索题目标题..." className="pl-8" />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              筛选
            </Button>
          </div>
        </CardContent>
      </Card>

      <QuestionsTable questions={questions} />
    </div>
  )
}
