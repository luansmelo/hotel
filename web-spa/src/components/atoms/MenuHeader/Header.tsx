'use client'

import React, { useContext } from 'react'
import styles from './styles.module.scss'
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material'
import { AuthContext } from '@/context/auth'

export default function Header() {
  const settings = ['Documentação', 'Sair']
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )

  const { user, signOut } = useContext(AuthContext)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleExit = () => {
    signOut()
  }

  return (
    <div className={styles.main}>
      <div className={styles.perfilContainer}>
        <div>
          <Tooltip title="Clique aqui!">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                sx={{ width: 44, height: 44 }}
                alt="Remy Sharp"
                src="/broken-image.jpg"
              >
                {user?.name[0]}
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
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={() => setting == 'Sair' && handleExit()}
              >
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
    </div>
  )
}
