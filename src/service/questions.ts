'use server'

import { auth } from '@clerk/nextjs/server'
import { eq, desc } from 'drizzle-orm'

import { db } from '@/db'
import { interviewQuestions, tags, interviewQuestionTags } from '@/db/schema'

export interface QuestionWithTags {
  id: string
  title: string
  difficulty: number
  tags: string[]
  createdAt: string
  status: string
  isVip: boolean
}

// 获取题目列表
export async function getQuestions(): Promise<QuestionWithTags[]> {
  try {
    // 查询所有题目
    const questionsData = await db
      .select({
        id: interviewQuestions.id,
        question: interviewQuestions.question,
        difficulty: interviewQuestions.difficulty,
        createdAt: interviewQuestions.createdAt,
        isPublished: interviewQuestions.isPublished,
        isVip: interviewQuestions.isVip,
      })
      .from(interviewQuestions)
      .orderBy(desc(interviewQuestions.createdAt))

    // 为每个题目获取标签
    const questionsWithTags = await Promise.all(
      questionsData.map(async question => {
        const questionTags = await db
          .select({
            tagName: tags.name,
          })
          .from(interviewQuestionTags)
          .innerJoin(tags, eq(interviewQuestionTags.tagId, tags.id))
          .where(eq(interviewQuestionTags.questionId, question.id))

        return {
          id: question.id,
          title: question.question,
          difficulty: question.difficulty,
          tags: questionTags.map(tag => tag.tagName),
          createdAt: question.createdAt.toISOString().split('T')[0], // 格式化日期
          status: question.isPublished ? '已发布' : '草稿',
          isVip: question.isVip,
        }
      })
    )

    return questionsWithTags
  } catch (error) {
    console.error('获取题目列表失败:', error)
    return []
  }
}

// 根据题目ID获取单个题目详情
export async function getQuestionById(id: string) {
  try {
    const question = await db
      .select()
      .from(interviewQuestions)
      .where(eq(interviewQuestions.id, id))
      .limit(1)

    if (question.length === 0) {
      return null
    }

    // 获取该题目的标签
    const questionTags = await db
      .select({
        id: tags.id,
        name: tags.name,
      })
      .from(interviewQuestionTags)
      .innerJoin(tags, eq(interviewQuestionTags.tagId, tags.id))
      .where(eq(interviewQuestionTags.questionId, id))

    return {
      ...question[0],
      tags: questionTags,
    }
  } catch (error) {
    console.error('获取题目详情失败:', error)
    return null
  }
}

export async function createQuestion(question: {
  title: string
  difficulty: number
  tags: string[]
  content: string
}) {
  const { title, difficulty, tags, content } = question
  const { userId } = await auth()
  if (!userId) {
    throw new Error('Unauthorized')
  }
  const [{ id: questionId }] = await db
    .insert(interviewQuestions)
    .values({
      question: title,
      answer: content,
      difficulty,
      publisherId: userId,
      isPublished: true,
      isVip: false,
    })
    .returning({ id: interviewQuestions.id })

  await db.insert(interviewQuestionTags).values(
    tags.map(tagId => ({
      questionId,
      tagId,
    }))
  )

  return questionId
}

export const deleteQuestion = async (questionId: string) => {
  const { userId } = await auth()
  if (!userId) {
    throw new Error('Unauthorized')
  }
  await db.delete(interviewQuestions).where(eq(interviewQuestions.id, questionId))

  return true
}

export async function updateQuestion(
  questionId: string,
  question: {
    title: string
    difficulty: number
    tags: string[]
    content: string
  }
) {
  const { title, difficulty, tags, content } = question
  const { userId } = await auth()
  if (!userId) {
    throw new Error('Unauthorized')
  }

  // 更新题目基本信息
  await db
    .update(interviewQuestions)
    .set({
      question: title,
      answer: content,
      difficulty,
      updatedAt: new Date(),
    })
    .where(eq(interviewQuestions.id, questionId))

  // 删除旧的标签关联
  await db.delete(interviewQuestionTags).where(eq(interviewQuestionTags.questionId, questionId))

  // 添加新的标签关联
  await db.insert(interviewQuestionTags).values(
    tags.map(tagId => ({
      questionId,
      tagId,
    }))
  )

  return questionId
}
