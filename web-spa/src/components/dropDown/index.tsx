import React, { memo } from 'react'
import { IconButton, Menu, MenuItem, Typography } from '@mui/material'
import styles from './styles.module.scss'
import { DropdownProps } from './types'

const Dropdown: React.FC<DropdownProps> = ({ actions, onClose, anchorEl }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={onClose}
      autoFocus={false}
      MenuListProps={{
        style: {
          padding: '4px',
          backgroundColor: '#30333F',
          borderRadius: '4px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      {actions.map((action, index) => (
        <MenuItem
          className={`${styles.menuItem} ${
            action.disabled ? styles.disabledItem : ''
          }`}
          key={index}
          sx={{
            background: '#30333F',
            width: '300px',
          }}
          onClick={() => {
            if (!action.disabled) {
              action.onClick()
            }
          }}
        >
          {action.icon && (
            <IconButton
              className={`${styles.menuItemIcon} ${
                action.disabled ? styles.disabledItemIcon : ''
              }`}
              color="inherit"
              onClick={() => {
                if (!action.disabled) {
                  action.onClick()
                }
              }}
            >
              {action.icon}
            </IconButton>
          )}
          <Typography className={styles.menuItemText}>
            {action.label}
          </Typography>
        </MenuItem>
      ))}
    </Menu>
  )
}

export default memo(Dropdown)
