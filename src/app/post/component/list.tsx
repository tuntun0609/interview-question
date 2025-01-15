import { Pagination } from '@/components/ui/pagination'
import { db } from '@/db'
import { and, inArray, sql } from 'drizzle-orm'
import { postsTable } from '@/db/schema'
import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import ListItem from './list-item'
import { tagList } from '@/config'

const totalPages = 15

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

  // 获取总数据量
  const totalPosts = await db
    .select({ count: sql`count(*)` })
    .from(postsTable)
    .where(
      and(
        tagsArray.length > 0 ? inArray(postsTable.tags, [tagsArray]) : undefined
      )
    )
    .then((result) => Number(result[0].count))

  // 计算总页数
  const totalPageCount = Math.ceil(totalPosts / totalPages)

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
  const showQuestionList = await db.query.postsTable.findMany({
    where: and(
      tagsArray.length > 0 ? inArray(postsTable.tags, [tagsArray]) : undefined
    ),
    offset: (pageNumber - 1) * totalPages,
    limit: totalPages,
    orderBy: (postsTable, { desc }) => [desc(postsTable.createdAt)],
  })

  return (
    <div>
      <div className="mt-4 space-y-4">
        {showQuestionList.map((item) => (
          <ListItem key={item.id} post={item} />
        ))}
      </div>
      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`/post?page=${pageNumber - 1}${
                  tags ? `&tags=${tags}` : ''
                }`}
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
                    href={`/post?page=${page}${tags ? `&tags=${tags}` : ''}`}
                    isActive={pageNumber === page}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationNext
                href={`/post?page=${pageNumber + 1}${
                  tags ? `&tags=${tags}` : ''
                }`}
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
