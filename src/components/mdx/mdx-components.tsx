import { cn } from '@/lib/utils'

import type { MDXComponents as MDXComponentsType } from 'mdx/types'
import CustomLink from './custom-link'
import { PhotoView } from 'react-photo-view'
import NextImage from 'next/image'

const MDXComponents: MDXComponentsType = {
  h1: (props) => (
    <h1
      {...props}
      className={cn('mb-4 mt-6 text-3xl font-bold', props.className)}
    />
  ),
  h2: (props) => (
    <h2
      {...props}
      className={cn(
        'mb-4 mt-6 border-gray-200 text-2xl font-semibold',
        props.className
      )}
    />
  ),
  h3: (props) => (
    <h3
      {...props}
      className={cn('mb-4 mt-6 text-1xl font-semibold', props.className)}
    />
  ),
  h4: (props) => (
    <h4
      {...props}
      className={cn('mb-4 mt-6 text-xl font-semibold', props.className)}
    />
  ),
  h5: (props) => (
    <h5
      {...props}
      className={cn('mb-4 mt-6 text-lg font-semibold', props.className)}
    />
  ),
  h6: (props) => (
    <h6
      {...props}
      className={cn('mb-4 mt-6 text-base font-semibold', props.className)}
    />
  ),
  p: (props) => <p {...props} className={cn('mb-4 mt-0', props.className)} />,
  a: (props) => (
    <CustomLink
      {...props}
      href={props.href ?? ''}
      className={cn('text-blue-600 underline', props.className)}
    />
  ),
  ul: (props) => (
    <ul
      {...props}
      className={cn('mb-4 mt-0 list-disc pl-5', props.className)}
    />
  ),
  ol: (props) => (
    <ol
      {...props}
      className={cn('mb-4 mt-0 list-decimal pl-5', props.className)}
    />
  ),
  li: (props) => <li {...props} className={cn('mb-2', props.className)} />,
  code: (props) => {
    return <code {...props} className={cn(props.className)} />
  },
  pre: (props) => (
    <pre
      {...props}
      className={cn('group relative overflow-x-auto py-4', props.className)}>
      {props.children}
    </pre>
  ),
  blockquote: (props) => (
    <blockquote
      {...props}
      className={cn(
        'my-4 border-l-4 border-gray-200 pl-4 italic text-gray-400 dark:text-gray-300',
        props.className
      )}
      {...props}
    />
  ),
  img: (props) => {
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
  Image: (props) => {
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
