'use client'
import '@mdxeditor/editor/style.css'
import type { ForwardedRef } from 'react'
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  diffSourcePlugin,
  toolbarPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  linkPlugin,
  linkDialogPlugin,
  tablePlugin,
  imagePlugin,
  sandpackPlugin,
  frontmatterPlugin,
  KitchenSinkToolbar,
  AdmonitionDirectiveDescriptor,
  directivesPlugin,
} from '@mdxeditor/editor'

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim()

const sandpackConfig = {
  defaultPreset: 'react' as const,
  presets: [
    {
      label: 'React',
      name: 'react' as const,
      meta: 'live react',
      sandpackTemplate: 'react' as const,
      sandpackTheme: 'light' as const,
      snippetFileName: '/App.js',
      snippetLanguage: 'jsx',
      initialSnippetContent: defaultSnippetContent,
    },
  ],
}

export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef?: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  const imageUploadHandler = async (image: File) => {
    // 模拟图片上传，返回一个随机图片URL
    return `https://picsum.photos/seed/${image.name}/800/400`
  }

  return (
    <MDXEditor
      contentEditableClassName="prose dark:prose-invert max-w-none"
      plugins={[
        // 基础功能插件
        listsPlugin(),
        quotePlugin(),
        headingsPlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),

        // 链接功能
        linkPlugin(),
        linkDialogPlugin(),

        // 表格功能
        tablePlugin(),

        // 图片功能
        imagePlugin({
          imageUploadHandler,
          imageAutocompleteSuggestions: [
            'https://picsum.photos/seed/1/800/400',
            'https://picsum.photos/seed/2/800/400',
          ],
        }),

        // 代码块功能
        codeBlockPlugin({
          defaultCodeBlockLanguage: 'js',
        }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            js: 'JavaScript',
            jsx: 'JavaScript (React)',
            ts: 'TypeScript',
            tsx: 'TypeScript (React)',
            css: 'CSS',
            html: 'HTML',
            json: 'JSON',
            md: 'Markdown',
            python: 'Python',
            rust: 'Rust',
            go: 'Go',
          },
        }),

        // Sandpack 代码运行
        sandpackPlugin({ sandpackConfig }),

        // 前置元数据
        frontmatterPlugin(),

        // 差异/源码视图
        diffSourcePlugin({
          viewMode: 'rich-text',
          diffMarkdown: '',
        }),

        // 工具栏插件
        toolbarPlugin({
          toolbarContents: () => <KitchenSinkToolbar />,
        }),
      ]}
      {...props}
      ref={editorRef}
    />
  )
}
