import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import { remarkImgToJsx } from 'pliny/mdx-plugins/index.js'
import readingTime from 'reading-time'
import rehypeKatex from 'rehype-katex'
import { default as rehypePrettyCode } from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkGithubAlerts from 'remark-github-alerts'
import remarkMath from 'remark-math'
import { visit } from 'unist-util-visit'

import { difficultyList, tagList } from '@/config'
import { formatDuration } from '@/lib/utils'

export const Question = defineDocumentType(() => ({
  name: 'Question',
  filePathPattern: `**/*.(mdx|md)`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    // 难度, 简单, 中等, 困难
    difficulty: {
      type: 'enum',
      options: difficultyList.map(item => item.value),
      required: true,
    },
    date: { type: 'date', required: true },
    slug: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'enum', options: tagList.map(item => item.value) } },
  },
  computedFields: {
    readingTime: {
      type: 'string',
      resolve: doc => formatDuration(readingTime(doc.body.raw).time),
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
      () => tree => {
        visit(tree, node => {
          if (node?.type === 'element' && node?.tagName === 'pre') {
            const [codeEl] = node.children
            if (codeEl.tagName !== 'code') {
              return
            }

            node.__rawCode__ = codeEl.children[0].value
          }
        })
      },
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'one-dark-pro',
        },
      ],
      () => tree => {
        visit(tree, node => {
          if (node?.type === 'element' && node?.tagName === 'figure') {
            if (!('data-rehype-pretty-code-figure' in node.properties)) {
              return
            }
            const preElement = node.children.at(-1)
            if (preElement.tagName !== 'pre') {
              return
            }

            preElement.properties['__rawCode__'] = node.__rawCode__
          }
        })
      },
    ],
  },
})
