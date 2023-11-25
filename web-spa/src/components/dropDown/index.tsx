import React from 'react'
import { Menu, MenuItem, Typography } from '@mui/material'
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
      MenuListProps={{
        style: {
          minWidth: '160px',
          backgroundColor: '#30333F',
          borderRadius: '4px',
        },
      }}
    >
      {actions.map((action, index) => (
        <MenuItem
          className={styles.menuItem}
          key={index}
          onClick={action.onClick}
        >
          <Typography className={styles.menuItemText}>
            {action.label}
          </Typography>
        </MenuItem>
      ))}
    </Menu>
  )
}

export default Dropdown
