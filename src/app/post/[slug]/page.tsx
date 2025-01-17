import { Preview } from '@/components/byte-editor/preview'
import { db } from '@/db'
import { postsTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'

export default async function QuestionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug: id } = await params

  const post = await db.query.postsTable.findFirst({
    where: eq(postsTable.id, Number(id)),
  })

  if (!post) {
    return notFound()
  }

  return (
    <div className="p-4 md:p-0 max-w-[600px] mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mt-4 md:mt-8 pb-4 border-b text-center px-2">
        {post.title}
      </h1>
      <Preview className="mb-4" value={post.content} />
    </div>
  )
}
