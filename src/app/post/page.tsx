import { Pagination } from '@/components/ui/pagination'
import ListForm from './component/list-form'

export default async function QuestionPage(props: {
  searchParams: Promise<{
    tags: string
    page: string
  }>
}) {
  const searchParams = await props.searchParams
  const { tags = '', page = '1' } = searchParams
  const tagsArray = tags.split(',')
  const pageNumber = parseInt(page)
  const totalPages = 15

  return (
    <div className="p-4 md:p-0 max-w-[800px] mx-auto mt-4">
      <ListForm tags={tagsArray} />
      <div className="mt-4">
        <Pagination></Pagination>
      </div>
    </div>
  )
}
