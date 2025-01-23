import List from './component/list'
import ListForm from './component/list-form'

export default async function QuestionPage(props: {
  searchParams: Promise<{
    tags: string
    page: string
    title: string
  }>
}) {
  const searchParams = await props.searchParams

  return (
    <div className="mx-auto mt-4 max-w-[800px] p-4 md:p-0">
      <ListForm />
      <List searchParams={searchParams} />
    </div>
  )
}
