'use client'
import React, { useState, ReactNode } from 'react'
import { Avatar, IconButton, Menu, Tooltip } from '@mui/material'

interface UserMenuProps {
  name: string
  children: ReactNode
}

const UserMenu: React.FC<UserMenuProps> = ({ children, name }) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <div>
      <Tooltip title="Clique aqui!">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            sx={{ width: 44, height: 44 }}
            alt="Remy Sharp"
            src="/broken-image.jpg"
          >
            {name.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {children}
      </Menu>
    </div>
  )
}

export default UserMenu
