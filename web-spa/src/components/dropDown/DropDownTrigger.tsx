import { IconButton, Box } from '@mui/material'
import React, { ReactNode } from 'react'

interface DropDownTriggerProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void
  children: ReactNode
  icon: ReactNode
}

const DropDownTrigger: React.FC<DropDownTriggerProps> = ({
  onClick,
  children,
  icon,
}) => (
  <Box>
    <IconButton
      size="small"
      onClick={onClick}
      sx={{
        backgroundColor: '#1F2128',
        borderRadius: '50%',
        color: 'white',
        transition: 'box-shadow 0.3s',
      }}
    >
      {icon}
    </IconButton>
    {children}
  </Box>
)

export default DropDownTrigger
