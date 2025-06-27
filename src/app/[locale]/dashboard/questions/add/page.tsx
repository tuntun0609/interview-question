'use client'
import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type MDXEditorMethods } from '@mdxeditor/editor'
import { Save, Eye, FileText } from 'lucide-react'
import * as z from 'zod'

import { MDXEditorWrapper } from '@/components/mdx-editor-wrapper'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const formSchema = z.object({
  title: z.string().min(2, '标题至少需要2个字符'),
  difficulty: z.coerce.number().min(1, '难度最小为1').max(5, '难度最大为5'),
  tags: z.string().min(1, '请至少输入一个标签'),
})

export default function AddQuestionPage() {
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      difficulty: undefined,
      tags: '',
    },
  })

  const handleSave = (values: z.infer<typeof formSchema>) => {
    const content = editorRef.current?.getMarkdown() || ''
    console.log('保存题目:', {
      ...values,
      tags: values.tags
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

      <div className="space-y-6">
        {/* 基本信息表单 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">基本信息</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>题目标题</FormLabel>
                        <FormControl>
                          <Input placeholder="请输入题目标题" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>难度等级</FormLabel>
                        <Select
                          onValueChange={value => field.onChange(Number(value))}
                          value={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="选择难度 (1-5)" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1 - 非常简单</SelectItem>
                            <SelectItem value="2">2 - 简单</SelectItem>
                            <SelectItem value="3">3 - 中等</SelectItem>
                            <SelectItem value="4">4 - 困难</SelectItem>
                            <SelectItem value="5">5 - 非常困难</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>标签</FormLabel>
                        <FormControl>
                          <Input placeholder="React, JavaScript, 前端" {...field} />
                        </FormControl>
                        <FormMessage />
                        <p className="text-muted-foreground text-xs">用逗号分隔多个标签</p>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    保存题目
                  </Button>

                  <Button type="button" onClick={handlePreview} variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    {isPreview ? '编辑模式' : '预览模式'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* 内容编辑器 */}
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
  )
}
