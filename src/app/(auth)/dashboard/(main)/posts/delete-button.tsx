'use client'

import { TrashIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

export default function DeleteButton({ postId }: { postId: number }) {
  const router = useRouter()

  const handleDelete = async () => {
    const response = await fetch(`/api/post/delete`, {
      method: 'DELETE',
      body: JSON.stringify({ id: postId }),
    })
    const data = await response.json()
    if (data.code === 200) {
      toast.success('删除成功')
      router.refresh()
    } else {
      toast.error('删除失败')
    }
  }

  return (
    <Button size="sm" variant="outline" onClick={handleDelete}>
      <TrashIcon className="h-4 w-4" />
      删除
    </Button>
  )
}
