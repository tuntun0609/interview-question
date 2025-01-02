export default async function QuestionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <div>QuestionPage {slug}</div>
}
