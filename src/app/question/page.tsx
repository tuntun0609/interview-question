import List from './component/list'
import ListForm from './component/list-form'

export default async function QuestionPage(props: {
  searchParams: Promise<{
    tags: string
    page: string
  }>
}) {
  const searchParams = await props.searchParams

  return (
    <div className="p-4 md:p-0 max-w-[800px] mx-auto mt-4">
      <ListForm />
      <List searchParams={searchParams} />
    </div>
  )
}
