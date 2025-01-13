import { db } from '@/db'
import { postsTable } from '@/db/schema'
import { SavePostRequest } from '@/type/post'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, title, content, id, tags } =
    (await req.json()) as SavePostRequest

  try {
    if (id) {
      await db
        .update(postsTable)
        .set({
          title,
          content,
          updatedAt: new Date(),
          tags,
        })
        .where(eq(postsTable.id, Number(id)))
    } else {
      await db.insert(postsTable).values({
        userEmail: email,
        title,
        content,
        tags,
      })
    }
    return NextResponse.json(
      { message: 'Post saved successfully', code: 200 },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { message: `Post saved failed, ${error.message}`, code: 500 },
      { status: 500 }
    )
  }
}
