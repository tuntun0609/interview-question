'use client'

import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

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
      <TrashIcon className="w-4 h-4" />
      删除
    </Button>
  )
}
