import { allQuestions, Question } from 'contentlayer/generated'

import { sortQuestions } from './utils'

const pageSize = 15

export const getQuestionList = async ({
  tags = [],
  page,
  title,
  isPublish = false,
  sort = 'desc',
}: {
  tags: string[]
  page: number
  title: string
  isPublish: boolean
  sort?: 'desc' | 'asc'
}) => {
  let pageNumber = page
  const filterQuestions = sortQuestions(
    allQuestions.filter(item => {
      if (tags.length > 0) {
        return item.tags?.some(tag => tags.includes(tag))
      }
      if (title) {
        return item.title.toLowerCase().includes(title.toLowerCase())
      }
      if (isPublish) {
        return item.isPublish
      }
      return true
    }),
    sort
  )

  // 获取总数据量
  const totalPosts = filterQuestions.length

  // 计算总页数
  const totalPageCount = Math.ceil(totalPosts / pageSize)

  // 矫正页码
  if (pageNumber < 1) {
    pageNumber = 1
  } else if (pageNumber > totalPageCount) {
    pageNumber = totalPageCount
  }

  // 处理无数据的情况
  if (totalPageCount === 0) {
    return {
      questions: [],
      totalPageCount: 0,
      currentPage: 1,
    }
  }

  // 根据分页和标签获取题目列表
  const showQuestionList: Question[] = filterQuestions.slice(
    (pageNumber - 1) * pageSize,
    pageNumber * pageSize
  )

  return {
    questions: showQuestionList,
    totalPageCount,
    currentPage: pageNumber,
  }
}
