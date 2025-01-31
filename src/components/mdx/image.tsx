import { PhotoView } from 'react-photo-view'
import NextImage from 'next/image'

import { cn, isCdnImage } from '@/lib/utils'

export const Image = (props: any) => {
  return (
    <PhotoView src={props.src}>
      {!isCdnImage(props.src) ? (
        <NextImage
          alt={props.alt}
          src={props.src}
          className={cn('cursor-zoom-in', props.className)}
          {...props}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={props.alt}
          src={props.src}
          {...props}
          className={cn('cursor-zoom-in', props.className)}
        />
      )}
    </PhotoView>
  )
}
