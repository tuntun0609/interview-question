import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { db } from '@/db'
import { postsTable } from '@/db/schema'
import { desc, sql } from 'drizzle-orm'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'
import { PencilIcon, PlusIcon } from 'lucide-react'
import Link from 'next/link'
import DeleteButton from './delete-button'
import { Badge } from '@/components/ui/badge'

export default async function PostsPage(props: {
  searchParams: Promise<{ page: string }>
}) {
  const searchParams = await props.searchParams
  const page = Number(searchParams.page ?? 1)

  // 每页显示的数量
  const pageSize = 10

  // 分页查询文章列表
  const postsList = await db
    .select()
    .from(postsTable)
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .orderBy(desc(postsTable.createdAt))

  // 获取总数
  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(postsTable)

  const totalPages = Math.ceil(count / pageSize)

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">文章列表</h2>
        <Link href="/dashboard/editor">
          <Button>
            <PlusIcon className="w-4 h-4" />
            新增文章
          </Button>
        </Link>
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">文章ID</TableHead>
              <TableHead>标题</TableHead>
              <TableHead>标签</TableHead>
              <TableHead>创建时间</TableHead>
              <TableHead>更新时间</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {postsList.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.id}</TableCell>
                <TableCell>
                  <Link className="text-purple-400" href={`/post/${post.id}`}>
                    {post.title}
                  </Link>
                </TableCell>
                <TableCell className="flex gap-2 flex-wrap">
                  {post.tags?.map((tag) => (
                    <Badge variant="outline" key={tag}>
                      {tag}
                    </Badge>
                  ))}
                </TableCell>
                <TableCell>{post.createdAt?.toLocaleString()}</TableCell>
                <TableCell>{post.updatedAt?.toLocaleString()}</TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <Link href={`/dashboard/editor/${post.id}`}>
                    <Button size="sm" variant="outline">
                      <PencilIcon className="w-4 h-4" />
                      编辑
                    </Button>
                  </Link>
                  <DeleteButton postId={post.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center items-center mt-4">
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
                <PaginationLink href={`?page=${page - 1}`}>
                  {page - 1}
                </PaginationLink>
              </PaginationItem>
            )}

            {/* 当前页 */}
            <PaginationItem>
              <PaginationLink href={`?page=${page}`} isActive>
                {page}
              </PaginationLink>
            </PaginationItem>

            {/* 当前页的后一页 */}
            {page < totalPages && (
              <PaginationItem>
                <PaginationLink href={`?page=${page + 1}`}>
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            )}

            {/* 省略号 */}
            {page < totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* 最后一页 */}
            {page < totalPages - 1 && (
              <PaginationItem>
                <PaginationLink href={`?page=${totalPages}`}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                href={`?page=${page < totalPages ? page + 1 : totalPages}`}
                aria-disabled={page >= totalPages}
                className={
                  page >= totalPages ? 'pointer-events-none opacity-50' : ''
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
