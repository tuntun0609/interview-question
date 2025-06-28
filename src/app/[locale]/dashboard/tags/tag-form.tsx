'use client'

import { memo, ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createTag, updateTag } from '@/service/tags'

const formSchema = z.object({
  name: z.string().min(1, '请输入标签名称').max(100, '标签名称不能超过100个字符'),
})

type FormValues = z.infer<typeof formSchema>

interface TagFormProps {
  children?: ReactNode
  mode?: 'create' | 'edit'
  tag?: {
    id: string
    name: string
  }
}

function TagForm({ children, mode = 'create', tag }: TagFormProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: tag?.name || '',
    },
  })

  const onSubmit = async (values: FormValues) => {
    setLoading(true)

    try {
      if (mode === 'create') {
        const result = await createTag({ name: values.name })
        if (result.success) {
          toast.success('标签创建成功')
          form.reset()
          setOpen(false)
          router.refresh()
        } else {
          toast.error(result.error || '创建标签失败')
        }
      } else if (mode === 'edit' && tag) {
        const result = await updateTag(tag.id, { name: values.name })
        if (result.success) {
          toast.success('标签更新成功')
          setOpen(false)
          router.refresh()
        } else {
          toast.error(result.error || '更新标签失败')
        }
      }
    } catch (_error) {
      toast.error(mode === 'create' ? '创建标签时出现错误' : '更新标签时出现错误')
    } finally {
      setLoading(false)
    }
  }

  const title = mode === 'create' ? '添加新标签' : '编辑标签'
  const description =
    mode === 'create' ? '创建一个新的标签来分类您的题目。' : '编辑现有标签的名称。'
  const buttonText = mode === 'create' ? '保存标签' : '更新标签'
  const loadingText = mode === 'create' ? '保存中...' : '更新中...'

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button
            variant={mode === 'edit' ? 'ghost' : 'default'}
            size={mode === 'edit' ? 'icon' : 'default'}
          >
            {mode === 'create' ? (
              <>
                <Plus className="mr-2 h-4 w-4" />
                添加标签
              </>
            ) : (
              <Pencil className="h-4 w-4" />
            )}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>名称</FormLabel>
                  <FormControl>
                    <Input placeholder="标签名称" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? loadingText : buttonText}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default memo(TagForm)
