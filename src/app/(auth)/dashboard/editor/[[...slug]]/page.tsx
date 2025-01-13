import { db } from '@/db'
import { Editor } from './editor-cmp'
import { Suspense } from 'react'

const StudioPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params
  let initValue:
    | {
        title: string
        content: string
        tags?: string[]
      }
    | undefined = undefined
  if (slug) {
    const id = slug?.[0]
    if (id) {
      const post = await db.query.postsTable.findFirst({
        where: (post, { eq }) => eq(post.id, Number(id)),
      })
      if (post) {
        initValue = {
          title: post.title,
          content: post.content,
          tags: post.tags || [],
        }
      }
    }
  }

  return (
    <div className="h-[calc(100vh-64px)]">
      <Suspense fallback={<div>Loading...</div>}>
        <Editor initValue={initValue} />
      </Suspense>
    </div>
  )
}

export default StudioPage
