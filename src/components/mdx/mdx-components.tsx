import { PhotoView } from 'react-photo-view'
import NextImage from 'next/image'

import { cn } from '@/lib/utils'

import { CopyCodeButton } from './copy-code-btn'
import CustomLink from './custom-link'

import type { MDXComponents as MDXComponentsType } from 'mdx/types'

const MDXComponents: MDXComponentsType = {
  a: props => <CustomLink {...props} href={props.href ?? ''} className={cn(props.className)} />,
  pre: ({ __rawCode__, ...props }) => {
    return (
      <pre {...props} className={cn('group', props.className)}>
        <CopyCodeButton code={__rawCode__} />
        {props.children}
      </pre>
    )
  },
  img: props => {
    return (
      <PhotoView src={props.src}>
        <NextImage
          alt={props.alt}
          src={props.src}
          className={cn('cursor-zoom-in', props.className)}
          {...props}
        />
      </PhotoView>
    )
  },
  Image: props => {
    return (
      <PhotoView src={props.src}>
        <NextImage
          alt={props.alt}
          src={props.src}
          className={cn('cursor-zoom-in', props.className)}
          {...props}
        />
      </PhotoView>
    )
  },
}

export default MDXComponents
