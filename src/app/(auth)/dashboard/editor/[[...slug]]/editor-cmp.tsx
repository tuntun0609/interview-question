'use client'

import { ByteEditor } from '@/components/byte-editor'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export const Editor = ({
  initValue,
}: {
  initValue?: {
    title: string
    content: string
  }
}) => {
  const { slug } = useParams() as { slug?: string[] }
  const { user } = useUser()
  const [title, setTitle] = useState(initValue?.title || '')
  const [content, setContent] = useState(initValue?.content || '')

  const handleSave = async () => {
    const email = user?.emailAddresses[0].emailAddress

    if (slug) {
      // 更新文章
      const id = slug[0]
      console.log(id)
    } else {
      // 创建新文章
      try {
        const res = await fetch('/api/post/save', {
          method: 'POST',
          body: JSON.stringify({ email, title, content }),
        })

        if (!res.ok) {
          throw new Error('Failed to save post')
        }

        toast.success('Event has been created')
      } catch {
        toast.error('Failed to create event')
      }
    }
  }

  return (
    <>
      <div className="h-12 flex items-center justify-between border-b px-4">
        <input
          type="text"
          className="w-[200px] h-10 text-xl focus-visible:outline-none"
          placeholder="请输入标题"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button className="h-8" variant="outline" onClick={handleSave}>
          保存
        </Button>
      </div>
      <ByteEditor value={content} onChange={setContent} />
    </>
  )
}
