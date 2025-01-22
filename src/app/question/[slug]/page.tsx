import dayjs from 'dayjs'
import { Pencil } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { MDXContent } from '@/components/mdx'
import ScrollTopButton from '@/components/scroll-to-top'
import { siteConfig } from '@/config'
import { cn } from '@/lib/utils'
import { allQuestions } from 'contentlayer/generated'

export default async function QuestionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug: id } = await params

  const question = allQuestions.find((item) => item.slug === id)

  if (!question) {
    return notFound()
  }

  return (
    <div className="p-4 lg:px-0 max-w-[800px] mx-auto">
      <div className="mb-8 font-douyinSans">
        <h1
          className={cn(
            'text-3xl md:text-4xl mt-4 md:mt-8 pb-4 text-center px-2'
          )}>
          {question.title}
        </h1>
        <div className="flex items-center gap-2 justify-center">
          <span className="text-sm text-gray-500">
            {dayjs(question.date).format('YYYY-MM-DD')}
          </span>
          <span className="text-sm text-gray-500">{question.readingTime}</span>
        </div>
      </div>
      <div className="my-4">
        <MDXContent code={question.body.code} />
        <div className="mt-8">
          <div className="flex items-center justify-end gap-2 text-primary">
            <Link
              target="_blank"
              href={`${siteConfig.githubUrl}/edit/master/content/${question._raw.sourceFilePath}`}
              className="flex items-center gap-2 hover:opacity-60 transition-opacity duration-300">
              <Pencil className="w-4 h-4" />
              <span>编辑此页</span>
            </Link>
          </div>
        </div>
      </div>
      <ScrollTopButton />
    </div>
  )
}
