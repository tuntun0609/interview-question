import QuestionTable from '@/components/question-table'
import { Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious } from '@/components/ui/pagination'
import { tagList } from '@/config'
import { allQuestions, Question } from 'contentlayer/generated'

const pageSize = 15

export default async function List({
  searchParams,
}: {
  searchParams: {
    tags: string
    page: string
  }
}) {
  const { tags = '', page = '1' } = searchParams
  const tagsArray = tags
    .split(',')
    .filter((item) => tagList.some((tag) => tag.value === item))

  let pageNumber = parseInt(page)

  const allFilterPosts = allQuestions.filter((item) => {
    if (tagsArray.length > 0) {
      return item.tags?.some((tag) => tagsArray.includes(tag))
    }
    return true
  })

  // 获取总数据量
  const totalPosts = allFilterPosts.length

  // 计算总页数
  const totalPageCount = Math.ceil(totalPosts / pageSize)

  // 处理无数据的情况
  if (totalPageCount === 0) {
    return <div className="mt-4 text-center text-gray-500">暂无数据</div>
  }

  if (pageNumber < 1) {
    pageNumber = 1
  } else if (pageNumber > totalPageCount) {
    pageNumber = totalPageCount
  }

  // 根据分页和标签获取题目列表
  const showQuestionList: Question[] = allFilterPosts.slice(
    (pageNumber - 1) * pageSize,
    pageNumber * pageSize
  )

  return (
    <div>
      <div className="mt-8 flex flex-col gap-4">
        <div className="border rounded-md">
          <QuestionTable questionList={showQuestionList} />
        </div>
      </div>
      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`?page=${pageNumber - 1}${tags ? `&tags=${tags}` : ''}`}
                aria-disabled={pageNumber === 1}
                className={
                  pageNumber === 1 ? 'pointer-events-none opacity-50' : ''
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPageCount }, (_, i) => i + 1).map(
              (page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href={`?page=${page}${tags ? `&tags=${tags}` : ''}`}
                    isActive={pageNumber === page}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationNext
                href={`?page=${pageNumber + 1}${tags ? `&tags=${tags}` : ''}`}
                aria-disabled={pageNumber === totalPageCount}
                className={
                  pageNumber === totalPageCount
                    ? 'pointer-events-none opacity-50'
                    : ''
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
