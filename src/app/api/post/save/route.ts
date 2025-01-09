import { db } from '@/db'
import { postsTable } from '@/db/schema'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, title, content } = await req.json()

  try {
    await db.insert(postsTable).values({
      userEmail: email,
      title,
      content,
    })
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
