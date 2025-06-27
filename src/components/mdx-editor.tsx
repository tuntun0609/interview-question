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
  UndoRedo,
  BoldItalicUnderlineToggles,
  CreateLink,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  BlockTypeSelect,
  CodeToggle,
  codeBlockPlugin,
  codeMirrorPlugin,
  linkPlugin,
  linkDialogPlugin,
  tablePlugin,
  imagePlugin,
  InsertImage,
  sandpackPlugin,
  frontmatterPlugin,
  InsertFrontmatter,
  DiffSourceToggleWrapper,
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
  const imageUploadHandler = async (_image: File) => {
    // 这里可以实现图片上传逻辑
    // 目前返回一个占位符URL
    return Promise.resolve('https://picsum.photos/200/300')
  }

  return (
    <MDXEditor
      plugins={[
        // 基础功能插件
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),

        // 链接功能
        linkPlugin(),
        linkDialogPlugin(),

        // 表格功能
        tablePlugin(),

        // 图片功能
        imagePlugin({
          imageUploadHandler,
          imageAutocompleteSuggestions: [
            'https://picsum.photos/200/300',
            'https://picsum.photos/300/200',
          ],
        }),

        // 代码块功能
        codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            js: 'JavaScript',
            javascript: 'JavaScript',
            jsx: 'JavaScript (React)',
            ts: 'TypeScript',
            typescript: 'TypeScript',
            tsx: 'TypeScript (React)',
            css: 'CSS',
            html: 'HTML',
            json: 'JSON',
            md: 'Markdown',
            markdown: 'Markdown',
            bash: 'Bash',
            sh: 'Shell',
            shell: 'Shell',
            python: 'Python',
            py: 'Python',
            java: 'Java',
            cpp: 'C++',
            c: 'C',
            php: 'PHP',
            sql: 'SQL',
          },
        }),

        // Sandpack 代码运行
        sandpackPlugin({ sandpackConfig }),

        // 前置元数据
        frontmatterPlugin(),

        // 差异/源码视图
        diffSourcePlugin({
          viewMode: 'rich-text',
        }),

        // 工具栏插件
        toolbarPlugin({
          toolbarContents: () => (
            <DiffSourceToggleWrapper>
              <UndoRedo />
              <BlockTypeSelect />
              <BoldItalicUnderlineToggles />
              <CodeToggle />
              <CreateLink />
              <InsertImage />
              <InsertTable />
              <InsertThematicBreak />
              <ListsToggle />
              <InsertFrontmatter />
            </DiffSourceToggleWrapper>
          ),
        }),
      ]}
      {...props}
      ref={editorRef}
    />
  )
}
