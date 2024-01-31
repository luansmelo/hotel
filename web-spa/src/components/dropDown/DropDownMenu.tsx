import React, { ReactNode } from 'react'
import { Menu } from '@mui/material'

export interface DropdownProps {
  anchorEl: HTMLElement | null
  children: ReactNode
  onClose: () => void
}

const DropdownMenu: React.FC<DropdownProps> = ({
  children,
  anchorEl,
  onClose,
  ...props
}) => {
  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        MenuListProps={{
          style: {
            padding: '4px',
            backgroundColor: '#30333F',
            borderRadius: '4px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
          },
        }}
        {...props}
      >
        {children}
      </Menu>
    </>
  )
}

export default DropdownMenu
