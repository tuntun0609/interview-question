import { Search, Edit, Trash2 } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getTagsWithCount, getTagStats, getPopularTags } from '@/service/tags'

import AddTagForm from './add-tag-form'

export default async function TagsPage() {
  // 从数据库获取标签数据
  const [allTags, tagStats, popularTags] = await Promise.all([
    getTagsWithCount(),
    getTagStats(),
    getPopularTags(5),
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">标签管理</h1>
          <p className="text-muted-foreground">管理和组织题目标签，便于分类和检索</p>
        </div>
        <AddTagForm />
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
                <Badge variant="secondary">{tagStats.totalTags}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">最常用标签</span>
                {tagStats.mostUsedTag ? (
                  <Badge variant="secondary">
                    {tagStats.mostUsedTag.name} ({tagStats.mostUsedTag.questionCount})
                  </Badge>
                ) : (
                  <Badge variant="outline">暂无</Badge>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">未使用标签</span>
                <Badge variant="outline">{tagStats.unusedTagsCount}</Badge>
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
            {popularTags.length === 0 ? (
              <div className="py-4 text-center">
                <p className="text-muted-foreground text-sm">暂无热门标签</p>
              </div>
            ) : (
              <div className="space-y-2">
                {popularTags.map(tag => (
                  <div key={tag.id} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{tag.name}</span>
                    <Badge variant="secondary">{tag.questionCount} 题</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>所有标签</CardTitle>
          <CardDescription>管理系统中的所有标签</CardDescription>
        </CardHeader>
        <CardContent>
          {allTags.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">暂无标签数据</p>
              <p className="text-muted-foreground mt-2 text-sm">
                点击「添加标签」按钮创建第一个标签
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>标签</TableHead>
                  <TableHead>题目数量</TableHead>
                  <TableHead>创建日期</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allTags.map(tag => (
                  <TableRow key={tag.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{tag.name}</span>
                      </div>
                    </TableCell>
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
          )}
        </CardContent>
      </Card>
    </div>
  )
}
