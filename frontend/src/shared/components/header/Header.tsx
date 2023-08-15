'use client'
import Image from 'next/image'
import styles from './header.module.css'
import { Avatar, Badge, Box, Grid, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import MailIcon from '@mui/icons-material/Mail';
import React from 'react';

export default function Header() {
  const settings = ['Profile', 'Account', 'Logout'];
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <header className={styles.headerContainer}>
      <Grid container spacing={2} justifyContent="end">
        <Grid item>
          <IconButton aria-label={'more than 99 notifications'}>
            <Badge badgeContent={100} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
        </Grid>
        <Grid item>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Grid>
      </Grid>
    </header>
  )
}
