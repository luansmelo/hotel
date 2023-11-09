'use client'
import React from 'react'
import styles from './styles.module.scss'
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material'
import { FEATURES, useAppContext } from '@/context/AppContext'

export default function Header() {
  const settings = ['Documentação', 'Sair']
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )
  const { user, setCurrentFeature } = useAppContext()
  const formattedName = user?.name
    ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
    : localStorage.getItem('userName')

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleExit = () => {
    setCurrentFeature(FEATURES.LOGIN)
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    localStorage.removeItem('userEmail')
  }

  return (
    <div className={styles.main}>
      <div className={styles.perfilContainer}>
        <div>
          <p>{formattedName || 'Usuário'}</p>
        </div>
        <div>
          <Tooltip title="Clique aqui!">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                sx={{ width: 44, height: 44 }}
                alt="Remy Sharp"
                src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
              />
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
