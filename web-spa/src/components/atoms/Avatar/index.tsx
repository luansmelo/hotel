import { Avatar as MuiAvatar } from '@mui/material'
import { IAvatarProps } from './types'

const AvatarAtom = ({ src, alt, size }: IAvatarProps) => {
  return <MuiAvatar src={src} alt={alt} sx={{ width: size, height: size }} />
}

export default AvatarAtom
