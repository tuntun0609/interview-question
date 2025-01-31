import { cn } from '@/lib/utils'

import { CopyCodeButton } from './copy-code-btn'
import CustomLink from './custom-link'
import { Image as CustomImage } from './image'

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
    return <CustomImage {...props} />
  },
  Image: props => {
    return <CustomImage {...props} />
  },
}

export default MDXComponents
