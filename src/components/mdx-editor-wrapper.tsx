'use client'
import { forwardRef } from 'react'
import { type MDXEditorMethods, type MDXEditorProps } from '@mdxeditor/editor'
import dynamic from 'next/dynamic'

// 动态导入 MDXEditor，禁用 SSR
const Editor = dynamic(() => import('./mdx-editor'), {
  ssr: false,
  loading: () => (
    <div className="border-border flex min-h-[400px] items-center justify-center rounded-md border">
      <p className="text-muted-foreground">正在加载编辑器...</p>
    </div>
  ),
})

// 导出带有 ref 转发的组件
export const MDXEditorWrapper = forwardRef<MDXEditorMethods, MDXEditorProps>((props, ref) => (
  <Editor {...props} editorRef={ref} />
))

MDXEditorWrapper.displayName = 'MDXEditorWrapper'
