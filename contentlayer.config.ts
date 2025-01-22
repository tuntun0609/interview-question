import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import { remarkImgToJsx } from 'pliny/mdx-plugins/index.js'
import remarkGithubAlerts from 'remark-github-alerts'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'
import readingTime from 'reading-time'
import { formatDuration } from '@/lib/utils'

export const Question = defineDocumentType(() => ({
  name: 'Question',
  filePathPattern: `**/*.(mdx|md)`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    // 难度, 简单, 中等, 困难
    difficulty: { type: 'string', required: true },
    date: { type: 'date', required: true },
    slug: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' } },
  },
  computedFields: {
    readingTime: {
      type: 'string',
      resolve: (doc) => formatDuration(readingTime(doc.body.raw).time),
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Question],
  mdx: {
    remarkPlugins: [remarkMath, remarkGfm, remarkImgToJsx, remarkGithubAlerts],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'one-dark-pro',
        },
      ],
    ],
  },
})
