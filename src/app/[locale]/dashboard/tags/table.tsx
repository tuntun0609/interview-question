'use client'

import { useState } from 'react'
import { Edit, Loader2, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { deleteTag, type TagWithCount } from '@/service/tags'

import EditTagForm from './tag-form'

interface TagsTableProps {
  tags: TagWithCount[]
}

const DeleteTagButton = ({ id }: { id: string }) => {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteTag = async () => {
    try {
      setIsDeleting(true)
      await deleteTag(id)
      router.refresh()
      toast.success('删除标签成功')
    } catch (error) {
      console.error('删除标签失败:', error)
      toast.error('删除标签失败')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Button
      className="text-red-600 hover:text-red-700"
      onClick={handleDeleteTag}
      disabled={isDeleting}
      variant="outline"
      size="sm"
    >
      {isDeleting ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-3 w-3" />}
    </Button>
  )
}

export default function TagsTable({ tags }: TagsTableProps) {
  if (tags.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">暂无标签数据</p>
        <p className="text-muted-foreground mt-2 text-sm">点击「添加标签」按钮创建第一个标签</p>
      </div>
    )
  }

  return (
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
        {tags.map(tag => (
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
                <EditTagForm mode="edit" tag={tag}>
                  <Button variant="outline" size="sm">
                    <Edit className="h-3 w-3" />
                  </Button>
                </EditTagForm>
                <DeleteTagButton id={tag.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
