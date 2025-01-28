import QuestionTable from '@/components/question-table'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { tagList } from '@/config'
import { getQuestionList } from '@/lib/question'

export default async function List({
  searchParams,
}: {
  searchParams: {
    tags: string
    page: string
    title: string
  }
}) {
  const { tags = '', page = '1', title = '' } = searchParams
  const tagsArray = tags.split(',').filter(item => tagList.some(tag => tag.value === item))

  const { questions, totalPageCount, currentPage } = await getQuestionList({
    tags: tagsArray,
    page: Number(page),
    title,
    isFilterPublish: false,
  })

  // 处理无数据的情况
  if (totalPageCount === 0) {
    return <div className="mt-4 text-center text-gray-500">暂无数据</div>
  }

  return (
    <div>
      <div className="mt-8 flex flex-col gap-4">
        <div className="rounded-md border">
          <QuestionTable questionList={questions} />
        </div>
      </div>
      <div className="mt-4 pb-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`?page=${currentPage - 1}${tags ? `&tags=${tags}` : ''}`}
                aria-disabled={currentPage === 1}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>

            {Array.from({ length: totalPageCount }, (_, i) => i + 1).map(page => (
              <PaginationItem key={page}>
                <PaginationLink
                  href={`?page=${page}${tags ? `&tags=${tags}` : ''}`}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href={`?page=${currentPage + 1}${tags ? `&tags=${tags}` : ''}`}
                aria-disabled={currentPage === totalPageCount}
                className={currentPage === totalPageCount ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
