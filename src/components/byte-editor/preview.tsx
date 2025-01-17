'use client'

import gfm from '@bytemd/plugin-gfm'
import { Viewer } from '@bytemd/react'
import highlight from '@bytemd/plugin-highlight-ssr'
import frontmatter from '@bytemd/plugin-frontmatter'
import math from '@bytemd/plugin-math-ssr'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import codeCopy from './plugin/copy-btn'

import styles from './index.module.scss'
import './editor.css'
import 'highlight.js/styles/atom-one-dark.min.css'
import 'katex/dist/katex.min.css'
import 'bytemd/dist/index.css'
import { cn } from '@/lib/utils'

const plugins = [
  gfm(),
  highlight(),
  frontmatter(),
  math(),
  mediumZoom(),
  codeCopy(),
]

export const Preview = (props: { value: string; className?: string }) => {
  return (
    <div className={cn(styles.editor, props.className)}>
      <Viewer value={props.value} plugins={plugins} />
    </div>
  )
}
