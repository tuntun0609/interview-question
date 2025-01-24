import dayjs from 'dayjs'
import { Pencil } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { GiscusComment } from '@/components/comment'
import { MDXContent } from '@/components/mdx'
import ScrollTopButton from '@/components/scroll-to-top'
import { siteConfig } from '@/config'
import { cn } from '@/lib/utils'
import { allQuestions } from 'contentlayer/generated'

export const generateStaticParams = async () => {
  return allQuestions.map(item => ({ slug: item.slug }))
}

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug: id } = await params
  const question = allQuestions.find(item => item.slug === id)
  return {
    title: question?.title,
    description: question?.title,
    keywords: [...siteConfig.commonKeywords, ...(question?.tags || [])],
  }
}

export default async function QuestionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug: id } = await params

  const question = allQuestions.find(item => item.slug === id)

  if (!question) {
    return notFound()
  }

  return (
    <div className="mx-auto max-w-screen-sm p-4 lg:px-0">
      <div className="mb-8 font-douyinSans">
        <h1
          className={cn(
            'mt-4 px-2 pb-4 text-center text-3xl dark:text-muted-foreground md:mt-8 md:text-4xl'
          )}
        >
          {question.title}
        </h1>
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm text-gray-500">{dayjs(question.date).format('YYYY-MM-DD')}</span>
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
              className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-60 dark:text-purple-400"
            >
              <Pencil className="h-4 w-4" />
              <span>编辑此页</span>
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <GiscusComment />
        </div>
      </div>
      <ScrollTopButton />
    </div>
  )
}
