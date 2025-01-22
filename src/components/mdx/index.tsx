'use client'

import { useMDXComponent } from 'next-contentlayer2/hooks'
import { PhotoProvider } from 'react-photo-view'
import { RotateCw, ZoomIn, ZoomOut } from 'lucide-react'

import MDXComponents from './mdx-components'

import './mdx.css'
import 'katex/dist/katex.min.css'
import 'remark-github-alerts/styles/github-colors-light.css'
import 'remark-github-alerts/styles/github-colors-dark-class.css'
import 'remark-github-alerts/styles/github-base.css'
import 'react-photo-view/dist/react-photo-view.css'

export const MDXContent = ({ code }: { code: string }) => {
  const MDXContent = useMDXComponent(code)
  return (
    <PhotoProvider
      maskOpacity={0.5}
      speed={() => 300}
      toolbarRender={({ onScale, scale, onRotate, rotate }) => {
        return (
          <div className="fixed bottom-8 left-[50%] flex -translate-x-1/2 gap-4 rounded-full bg-black/50 backdrop-blur-sm px-4 py-3">
            <ZoomIn
              className="cursor-pointer text-white/90 hover:text-white/80"
              onClick={() => onScale(scale + 1)}
            />
            <ZoomOut
              className="cursor-pointer text-white/90 hover:text-white/80"
              onClick={() => onScale(scale - 1)}
            />
            <RotateCw
              className="cursor-pointer text-white/90 hover:text-white/80"
              onClick={() => onRotate((rotate + 90) % 360)}
            />
          </div>
        )
      }}>
      <MDXContent components={MDXComponents} />
    </PhotoProvider>
  )
}
