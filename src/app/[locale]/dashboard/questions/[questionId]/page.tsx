import { getQuestionById } from '@/service/questions'

import QuestionEditor from '../editor'

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ questionId: string }>
}) {
  const { questionId } = await params
  const question = await getQuestionById(questionId)

  if (!question) {
    return <div>题目不存在</div>
  }

  return (
    <QuestionEditor
      mode="edit"
      initialData={{
        id: questionId,
        title: question.question,
        difficulty: question.difficulty,
        tags: question.tags.map(tag => tag.id),
        content: question.answer,
      }}
    />
  )
}
