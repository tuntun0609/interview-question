'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { deleteQuestion } from '@/service/questions'

interface Question {
  id: string
  title: string
  difficulty: number
  tags: string[]
  status: string
  isVip: boolean
  createdAt: string
}

interface QuestionsTableProps {
  questions: Question[]
}

export function QuestionsTable({ questions }: QuestionsTableProps) {
  const router = useRouter()

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1:
      case 2:
        return 'bg-green-100 text-green-800'
      case 3:
        return 'bg-yellow-100 text-yellow-800'
      case 4:
      case 5:
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case '已发布':
        return 'bg-blue-100 text-blue-800'
      case '草稿':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleDeleteQuestion = async (questionId: string) => {
    try {
      await deleteQuestion(questionId)
      toast.success('题目删除成功')
      router.refresh()
    } catch (_error) {
      toast.error('题目删除失败')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>题目列表</CardTitle>
        <CardDescription>共 {questions.length} 道题目</CardDescription>
      </CardHeader>
      <CardContent>
        {questions.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">暂无题目数据</p>
            <p className="text-muted-foreground mt-2 text-sm">
              点击「添加题目」按钮创建第一道面试题
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>标题</TableHead>
                <TableHead>难度</TableHead>
                <TableHead>标签</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>VIP</TableHead>
                <TableHead>创建日期</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {questions.map(question => (
                <TableRow key={question.id}>
                  <TableCell className="font-medium">{question.title}</TableCell>
                  <TableCell>
                    <Badge className={getDifficultyColor(question.difficulty)}>
                      {new Array(question.difficulty).fill('⭐️').join('')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {question.tags.length > 0 ? (
                        question.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted-foreground text-sm">无标签</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(question.status)}>{question.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {question.isVip ? (
                      <Badge className="bg-purple-100 text-purple-800">VIP</Badge>
                    ) : (
                      <span className="text-muted-foreground text-sm">普通</span>
                    )}
                  </TableCell>
                  <TableCell>{question.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/dashboard/questions/${question.id}`)}
                      >
                        编辑
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteQuestion(question.id)}
                      >
                        删除
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
