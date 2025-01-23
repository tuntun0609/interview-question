import { PlusIcon } from 'lucide-react'
import Link from 'next/link'

import QuestionTable from '@/components/question-table'
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { allQuestions, Question } from 'contentlayer/generated'

const pageSize = 20

export default async function PostsPage(props: { searchParams: Promise<{ page: string }> }) {
  const searchParams = await props.searchParams
  let page = Number(searchParams.page ?? 1)

  const tagsArray: string[] = []

  const allFilterQuestions = allQuestions.filter(item => {
    if (tagsArray.length > 0) {
      return item.tags?.some(tag => tagsArray.includes(tag))
    }
    return true
  })

  // 获取总数据量
  const totalQuestions = allFilterQuestions.length

  // 计算总页数
  const totalPageCount = Math.ceil(totalQuestions / pageSize)

  // 处理无数据的情况
  if (totalPageCount === 0) {
    return <div className="mt-4 text-center text-gray-500">暂无数据</div>
  }

  if (page < 1) {
    page = 1
  } else if (page > totalPageCount) {
    page = totalPageCount
  }

  // 根据分页和标签获取题目列表
  const showQuestionList: Question[] = allFilterQuestions.slice(
    (page - 1) * pageSize,
    page * pageSize
  )

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">文章列表</h2>
        <Link href="/dashboard/editor">
          <Button>
            <PlusIcon className="h-4 w-4" />
            新增文章
          </Button>
        </Link>
      </div>
      <div className="rounded-md border">
        <QuestionTable questionList={showQuestionList} />
      </div>
      <div className="mt-4 flex items-center justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`?page=${page > 1 ? page - 1 : 1}`}
                aria-disabled={page <= 1}
                className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>

            {/* 首页 */}
            {page > 2 && (
              <PaginationItem>
                <PaginationLink href="?page=1">1</PaginationLink>
              </PaginationItem>
            )}

            {/* 省略号 */}
            {page > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* 当前页的前一页 */}
            {page > 1 && (
              <PaginationItem>
                <PaginationLink href={`?page=${page - 1}`}>{page - 1}</PaginationLink>
              </PaginationItem>
            )}

            {/* 当前页 */}
            <PaginationItem>
              <PaginationLink href={`?page=${page}`} isActive>
                {page}
              </PaginationLink>
            </PaginationItem>

            {/* 当前页的后一页 */}
            {page < totalPageCount && (
              <PaginationItem>
                <PaginationLink href={`?page=${page + 1}`}>{page + 1}</PaginationLink>
              </PaginationItem>
            )}

            {/* 省略号 */}
            {page < totalPageCount - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* 最后一页 */}
            {page < totalPageCount - 1 && (
              <PaginationItem>
                <PaginationLink href={`?page=${totalPageCount}`}>{totalPageCount}</PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                href={`?page=${page < totalPageCount ? page + 1 : totalPageCount}`}
                aria-disabled={page >= totalPageCount}
                className={page >= totalPageCount ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
