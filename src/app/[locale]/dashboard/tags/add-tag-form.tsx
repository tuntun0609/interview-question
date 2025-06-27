'use client'

import { useState, useRef } from 'react'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'

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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { addTag } from './actions'

export default function AddTagForm() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (formData: FormData) => {
    setLoading(true)

    try {
      const result = await addTag(formData)

      if (result.success) {
        toast.success(result.message || '标签创建成功')
        // 重置表单并关闭对话框
        formRef.current?.reset()
        setOpen(false)
      } else {
        toast.error(result.error || '创建标签失败')
      }
    } catch (_error) {
      toast.error('创建标签时出现错误，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <form ref={formRef} action={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                名称*
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="标签名称"
                className="col-span-3"
                required
                maxLength={100}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? '保存中...' : '保存标签'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
