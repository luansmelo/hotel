import { Box } from '@mui/material'
import React, { ReactNode } from 'react'

interface DropDownActionsProps {
  children: ReactNode
}

const DropDownActions: React.FC<DropDownActionsProps> = ({ children }) => (
  <Box>{children}</Box>
)

export default DropDownActions
