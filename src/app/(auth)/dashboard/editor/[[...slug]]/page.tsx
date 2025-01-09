import { db } from '@/db'
import { Editor } from './editor-cmp'

const StudioPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params
  let initValue: { title: string; content: string } | undefined = undefined
  if (slug) {
    const id = slug?.[0]
    if (id) {
      const post = await db.query.postsTable.findFirst({
        where: (post, { eq }) => eq(post.id, Number(id)),
      })
      if (post) {
        initValue = { title: post.title, content: post.content }
      }
    }
  }

  return (
    <div className="h-[calc(100vh-64px)]">
      <Editor initValue={initValue} />
    </div>
  )
}

export default StudioPage
