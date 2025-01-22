import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

import { db } from '@/db'
import { postsTable } from '@/db/schema'

export async function DELETE(req: NextRequest) {
  const postId = (await req.json()) as { id: number }
  try {
    await db.delete(postsTable).where(eq(postsTable.id, postId.id))
    return NextResponse.json(
      { message: 'Post deleted', code: 200 },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Failed to delete post', error: error.message, code: 500 },
      { status: 500 }
    )
  }
}
