'use client'
import { useState, useRef } from 'react'
import { type MDXEditorMethods } from '@mdxeditor/editor'
import { Save, Eye, FileText } from 'lucide-react'

import { MDXEditorWrapper } from '@/components/mdx-editor-wrapper'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function AddQuestionPage() {
  const [title, setTitle] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [tags, setTags] = useState('')
  const [isPreview, setIsPreview] = useState(false)
  const [markdownContent, setMarkdownContent] = useState(`# 面试题目

## 题目描述
请在这里描述你的面试题目...

## 考察要点
- 技能点1
- 技能点2
- 技能点3

## 参考答案
\`\`\`js
// 在这里提供参考代码或答案
function solution() {
  // 你的代码
}
\`\`\`

## 难度等级
请标注题目的难度等级（初级/中级/高级）

## 相关链接
- [相关文档](https://example.com)
- [参考资料](https://example.com)
`)

  const editorRef = useRef<MDXEditorMethods>(null)

  const handleSave = () => {
    const content = editorRef.current?.getMarkdown() || ''
    console.log('保存题目:', {
      title,
      difficulty,
      tags: tags
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean),
      content,
    })
    // 这里可以添加保存到数据库的逻辑
  }

  const handlePreview = () => {
    setIsPreview(!isPreview)
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
          <FileText className="h-8 w-8" />
          添加面试题目
        </h1>
        <p className="text-muted-foreground mt-2">
          使用 Markdown 编辑器创建一道新的面试题目，支持代码高亮、表格、图片等丰富格式
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* 左侧表单 */}
        <div className="space-y-4 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">基本信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">题目标题</Label>
                <Input
                  id="title"
                  placeholder="请输入题目标题"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty">难度等级</Label>
                <select
                  id="difficulty"
                  className="border-border w-full rounded-md border px-3 py-2"
                  value={difficulty}
                  onChange={e => setDifficulty(e.target.value)}
                >
                  <option value="">请选择难度</option>
                  <option value="初级">初级</option>
                  <option value="中级">中级</option>
                  <option value="高级">高级</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">标签</Label>
                <Input
                  id="tags"
                  placeholder="React, JavaScript, 前端"
                  value={tags}
                  onChange={e => setTags(e.target.value)}
                />
                <p className="text-muted-foreground text-xs">用逗号分隔多个标签</p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Button onClick={handleSave} className="w-full" size="sm">
                  <Save className="mr-2 h-4 w-4" />
                  保存题目
                </Button>

                <Button onClick={handlePreview} variant="outline" className="w-full" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  {isPreview ? '编辑模式' : '预览模式'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧编辑器 */}
        <div className="lg:col-span-3">
          <Card className="min-h-[600px]">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg">
                <span>题目内容编辑</span>
                <div className="text-muted-foreground text-sm">
                  {isPreview ? '预览模式' : 'Markdown 编辑模式'}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="min-h-[500px]">
                <MDXEditorWrapper
                  ref={editorRef}
                  markdown={markdownContent}
                  onChange={content => setMarkdownContent(content)}
                  placeholder="开始编写你的面试题目..."
                  readOnly={isPreview}
                  className="min-h-[500px]"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 使用提示 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">编辑器功能说明</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2 lg:grid-cols-3">
            <div>
              <h4 className="mb-2 font-medium">基础格式</h4>
              <ul className="text-muted-foreground space-y-1">
                <li>• 支持标题 (H1-H6)</li>
                <li>• 粗体、斜体、下划线</li>
                <li>• 有序和无序列表</li>
                <li>• 引用块</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-medium">高级功能</h4>
              <ul className="text-muted-foreground space-y-1">
                <li>• 代码块语法高亮</li>
                <li>• 表格插入和编辑</li>
                <li>• 图片上传和链接</li>
                <li>• 链接自动完成</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-medium">快捷键</h4>
              <ul className="text-muted-foreground space-y-1">
                <li>• Ctrl+B: 粗体</li>
                <li>• Ctrl+I: 斜体</li>
                <li>• Ctrl+K: 插入链接</li>
                <li>• Ctrl+Z: 撤销</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
