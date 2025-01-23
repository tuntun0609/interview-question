'use client'

import frontmatter from '@bytemd/plugin-frontmatter'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight-ssr'
import math from '@bytemd/plugin-math-ssr'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import mermaid from '@bytemd/plugin-mermaid'
import { Editor } from '@bytemd/react'
import zhCN from 'bytemd/locales/zh_Hans.json'

import { useMergedState } from '@/lib/hook/use-merged-state'

import styles from './index.module.scss'

import 'bytemd/dist/index.css'

import './editor.css'
import 'highlight.js/styles/atom-one-dark.min.css'
import 'katex/dist/katex.min.css'

const plugins = [gfm(), highlight(), frontmatter(), math(), mediumZoom(), mermaid()]

export const ByteEditor = (props: { value: string; onChange: (value: string) => void }) => {
  const [value, setValue] = useMergedState(props.value, {
    onChange: props.onChange,
  })

  return (
    <div className={styles.editor}>
      <Editor
        value={value}
        plugins={plugins}
        onChange={v => {
          setValue(v)
        }}
        locale={zhCN}
      />
    </div>
  )
}
