'use client'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { getExtraCommands } from '@uiw/react-md-editor/commands'
import { LoaderCircle, Save } from 'lucide-react'
import { cn } from '@/lib/utils'

import styles from './index.module.scss'
import 'highlight.js/styles/atom-one-dark.min.css'
import './markdown-editor.css'
import { Button } from '../ui/button'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
  loading: () => (
    <div
      className={cn(styles.editor, 'flex gap-2 items-center justify-center')}>
      编辑器加载中... <LoaderCircle className="w-4 h-4 animate-spin" />
    </div>
  ),
})

export function Editor() {
  const [value, setValue] = useState('')
  return (
    <div className={styles.editor}>
      <MDEditor
        height="calc(100vh - 64px)"
        value={value}
        onChange={(v) => setValue(v ?? '')}
        visibleDragbar={false}
        previewOptions={{}}
        extraCommands={[
          {
            name: 'save',
            keyCommand: 'save',
            execute: () => {
              console.log('save')
            },
            icon: (
              <Button className="w-8 !h-8 p-0">
                <Save />
              </Button>
            ),
          },
          ...getExtraCommands(),
        ]}
      />
    </div>
  )
}
