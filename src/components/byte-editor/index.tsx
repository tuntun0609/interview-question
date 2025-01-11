'use client'

import gfm from '@bytemd/plugin-gfm'
import { Editor } from '@bytemd/react'
import highlight from '@bytemd/plugin-highlight-ssr'
import frontmatter from '@bytemd/plugin-frontmatter'
import math from '@bytemd/plugin-math-ssr'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import mermaid from '@bytemd/plugin-mermaid'

import 'bytemd/dist/index.css'

import styles from './index.module.scss'
import './editor.css'
import 'highlight.js/styles/atom-one-dark.min.css'
import 'katex/dist/katex.min.css'
import zhCN from 'bytemd/locales/zh_Hans.json'
import { useMergedState } from '@/lib/hook/use-merged-state'

const plugins = [
  gfm(),
  highlight(),
  frontmatter(),
  math(),
  mediumZoom(),
  mermaid(),
]

export const ByteEditor = (props: {
  value: string
  onChange: (value: string) => void
}) => {
  const [value, setValue] = useMergedState(props.value, {
    onChange: props.onChange,
  })

  return (
    <div className={styles.editor}>
      <Editor
        value={value}
        plugins={plugins}
        onChange={(v) => {
          setValue(v)
        }}
        locale={zhCN}
      />
    </div>
  )
}
