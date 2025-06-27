import { eq, desc } from 'drizzle-orm'

import { db } from '@/db'
import { interviewQuestions, tags, interviewQuestionTags } from '@/db/schema'

export interface QuestionWithTags {
  id: string
  title: string
  difficulty: string
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
          difficulty: getDifficultyText(question.difficulty),
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

// 将数字难度转换为中文
function getDifficultyText(difficulty: number): string {
  switch (difficulty) {
    case 1:
    case 2:
      return '简单'
    case 3:
      return '中等'
    case 4:
    case 5:
      return '困难'
    default:
      return '未知'
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
