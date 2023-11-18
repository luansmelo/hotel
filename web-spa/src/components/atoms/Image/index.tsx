'use-client'
import NextImage from 'next/image'
import { ImageProps } from './types'

export default function Image({ src, alt, width, height }: ImageProps) {
  return <NextImage src={src} alt={alt} width={width} height={height} />
}
