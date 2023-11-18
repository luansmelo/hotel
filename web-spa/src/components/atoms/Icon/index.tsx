import { Icon as MuiIcon } from '@mui/material'

export interface IIconProps {
  onClick?: () => void
  children: React.ReactNode
  sx?: object
}

const Icon = ({ onClick, children, sx }: IIconProps) => {
  return (
    <MuiIcon onClick={onClick} sx={sx}>
      {children}
    </MuiIcon>
  )
}

export default Icon
