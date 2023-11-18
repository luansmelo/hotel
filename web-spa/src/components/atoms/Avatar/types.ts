export interface IAvatarProps {
  src: string
  alt: string
  size?: 'small' | 'medium' | 'large'
  onClick?: () => void
}
