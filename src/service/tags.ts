'use server'

import { eq, desc, count, and } from 'drizzle-orm'

import { db } from '@/db'
import { tags, interviewQuestionTags } from '@/db/schema'

export interface TagWithCount {
  id: string
  name: string
  questionCount: number
  createdAt: string
}

export interface TagStats {
  totalTags: number
  mostUsedTag: TagWithCount | null
  unusedTagsCount: number
}

export interface CreateTagData {
  name: string
}

export const getTags = async () => {
  const allTags = await db
    .select({
      id: tags.id,
      name: tags.name,
      createdAt: tags.createdAt,
    })
    .from(tags)
    .orderBy(desc(tags.createdAt))
  return allTags
}

// 获取标签列表及其题目数量
export async function getTagsWithCount(): Promise<TagWithCount[]> {
  try {
    // 查询所有标签
    const allTags = await getTags()

    // 为每个标签计算题目数量
    const tagsWithCount = await Promise.all(
      allTags.map(async tag => {
        const questionCountResult = await db
          .select({ count: count() })
          .from(interviewQuestionTags)
          .where(eq(interviewQuestionTags.tagId, tag.id))

        return {
          id: tag.id,
          name: tag.name,
          questionCount: questionCountResult[0].count,
          createdAt: tag.createdAt.toISOString().split('T')[0],
        }
      })
    )

    // 按题目数量降序排序
    return tagsWithCount.sort((a, b) => b.questionCount - a.questionCount)
  } catch (error) {
    console.error('获取标签列表失败:', error)
    return []
  }
}

// 获取标签统计信息
export async function getTagStats(): Promise<TagStats> {
  try {
    const tagsWithCount = await getTagsWithCount()

    const totalTags = tagsWithCount.length
    const mostUsedTag = tagsWithCount.length > 0 ? tagsWithCount[0] : null
    const unusedTagsCount = tagsWithCount.filter(tag => tag.questionCount === 0).length

    return {
      totalTags,
      mostUsedTag,
      unusedTagsCount,
    }
  } catch (error) {
    console.error('获取标签统计失败:', error)
    return {
      totalTags: 0,
      mostUsedTag: null,
      unusedTagsCount: 0,
    }
  }
}

// 获取热门标签（前N个）
export async function getPopularTags(limit: number = 5): Promise<TagWithCount[]> {
  try {
    const allTags = await getTagsWithCount()
    return allTags
      .filter(tag => tag.questionCount > 0) // 只返回有题目的标签
      .slice(0, limit)
  } catch (error) {
    console.error('获取热门标签失败:', error)
    return []
  }
}

// 根据标签ID获取单个标签详情
export async function getTagById(id: string) {
  try {
    const tag = await db.select().from(tags).where(eq(tags.id, id)).limit(1)

    if (tag.length === 0) {
      return null
    }

    // 计算该标签的题目数量
    const questionCountResult = await db
      .select({ count: count() })
      .from(interviewQuestionTags)
      .where(eq(interviewQuestionTags.tagId, id))

    return {
      ...tag[0],
      questionCount: questionCountResult[0].count,
    }
  } catch (error) {
    console.error('获取标签详情失败:', error)
    return null
  }
}

// 创建新标签
export async function createTag(data: CreateTagData) {
  try {
    const { name } = data

    // 检查标签名是否已存在
    const existingTag = await db.select().from(tags).where(eq(tags.name, name.trim())).limit(1)

    if (existingTag.length > 0) {
      throw new Error('标签名称已存在')
    }

    // 创建新标签
    const newTag = await db
      .insert(tags)
      .values({
        name: name.trim(),
      })
      .returning()

    return {
      success: true,
      data: newTag[0],
    }
  } catch (error) {
    console.error('创建标签失败:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : '创建标签失败',
    }
  }
}

export const deleteTag = async (id: string) => {
  try {
    await db.delete(tags).where(eq(tags.id, id))
    await db.delete(interviewQuestionTags).where(eq(interviewQuestionTags.tagId, id))
    return {
      success: true,
    }
  } catch (error) {
    console.error('删除标签失败:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : '删除标签失败',
    }
  }
}

// 更新标签
export async function updateTag(id: string, data: CreateTagData) {
  try {
    const { name } = data

    // 检查标签名是否已存在（排除当前标签）
    const existingTag = await db
      .select()
      .from(tags)
      .where(and(eq(tags.name, name.trim()), eq(tags.id, id)))
      .limit(1)

    if (existingTag.length > 0) {
      throw new Error('标签名称已存在')
    }

    // 更新标签
    const updatedTag = await db
      .update(tags)
      .set({
        name: name.trim(),
      })
      .where(eq(tags.id, id))
      .returning()

    return {
      success: true,
      data: updatedTag[0],
    }
  } catch (error) {
    console.error('更新标签失败:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : '更新标签失败',
    }
  }
}
