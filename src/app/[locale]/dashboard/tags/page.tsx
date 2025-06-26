import { Plus, Search, Edit, Trash2 } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'

export default function TagsPage() {
  // 模拟数据
  const tags = [
    {
      id: 1,
      name: 'React',
      description: 'React.js 相关技术和概念',
      color: '#61dafb',
      questionCount: 15,
      createdAt: '2024-01-10',
    },
    {
      id: 2,
      name: 'JavaScript',
      description: 'JavaScript 编程语言',
      color: '#f7df1e',
      questionCount: 28,
      createdAt: '2024-01-08',
    },
    {
      id: 3,
      name: 'Node.js',
      description: 'Node.js 后端开发',
      color: '#339933',
      questionCount: 12,
      createdAt: '2024-01-05',
    },
    {
      id: 4,
      name: 'CSS',
      description: '层叠样式表和前端样式',
      color: '#1572b6',
      questionCount: 8,
      createdAt: '2024-01-03',
    },
    {
      id: 5,
      name: 'Frontend',
      description: '前端开发相关',
      color: '#ff6b6b',
      questionCount: 20,
      createdAt: '2024-01-01',
    },
    {
      id: 6,
      name: 'Backend',
      description: '后端开发相关',
      color: '#4ecdc4',
      questionCount: 16,
      createdAt: '2023-12-28',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">标签管理</h1>
          <p className="text-muted-foreground">管理和组织题目标签，便于分类和检索</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              添加标签
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>添加新标签</DialogTitle>
              <DialogDescription>创建一个新的标签来分类您的题目。</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  名称
                </Label>
                <Input id="name" placeholder="标签名称" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="color" className="text-right">
                  颜色
                </Label>
                <Input id="color" type="color" defaultValue="#4ecdc4" className="col-span-3 h-10" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  描述
                </Label>
                <Textarea
                  id="description"
                  placeholder="标签描述..."
                  className="col-span-3"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">保存标签</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>搜索标签</CardTitle>
          <CardDescription>快速查找您需要的标签</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
            <Input placeholder="搜索标签名称..." className="pl-8" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>标签统计</CardTitle>
            <CardDescription>标签使用情况概览</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">总标签数</span>
                <Badge variant="secondary">{tags.length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">最常用标签</span>
                <Badge style={{ backgroundColor: '#f7df1e', color: '#000' }}>
                  JavaScript ({tags.find(t => t.name === 'JavaScript')?.questionCount})
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">未使用标签</span>
                <Badge variant="outline">0</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>热门标签</CardTitle>
            <CardDescription>根据题目数量排序的标签</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {tags
                .sort((a, b) => b.questionCount - a.questionCount)
                .slice(0, 5)
                .map(tag => (
                  <div key={tag.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: tag.color }}
                      />
                      <span className="text-sm font-medium">{tag.name}</span>
                    </div>
                    <Badge variant="secondary">{tag.questionCount} 题</Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>所有标签</CardTitle>
          <CardDescription>管理系统中的所有标签</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>标签</TableHead>
                <TableHead>描述</TableHead>
                <TableHead>题目数量</TableHead>
                <TableHead>创建日期</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tags.map(tag => (
                <TableRow key={tag.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-4 w-4 rounded-full"
                        style={{ backgroundColor: tag.color }}
                      />
                      <span className="font-medium">{tag.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{tag.description}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{tag.questionCount}</Badge>
                  </TableCell>
                  <TableCell>{tag.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
