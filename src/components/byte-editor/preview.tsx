'use client'

import frontmatter from '@bytemd/plugin-frontmatter'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight-ssr'
import math from '@bytemd/plugin-math-ssr'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import { Viewer } from '@bytemd/react'

import { cn } from '@/lib/utils'

import codeCopy from './plugin/copy-btn'

import styles from './index.module.scss'
import './editor.css'
import 'highlight.js/styles/atom-one-dark.min.css'
import 'katex/dist/katex.min.css'
import 'bytemd/dist/index.css'

const plugins = [gfm(), highlight(), frontmatter(), math(), mediumZoom(), codeCopy()]

export const Preview = (props: { value: string; className?: string }) => {
  return (
    <div className={cn(styles.editor, props.className)}>
      <Viewer value={props.value} plugins={plugins} />
    </div>
  )
}
