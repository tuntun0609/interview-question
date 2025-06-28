import { Search } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { getTagsWithCount, getTagStats, getPopularTags } from '@/service/tags'

import TagsTable from './table'
import TagForm from './tag-form'

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
        <TagForm />
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
          <TagsTable tags={allTags} />
        </CardContent>
      </Card>
    </div>
  )
}
