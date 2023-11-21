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
        'aria-labelledby': 'basic-button',
        style: {
          padding: 0,
          outline: 'none',
          boxShadow:
            '4px 4px 8px 0 rgba(0, 0, 0, 0.2), 6px 6px 20px 0 rgba(0, 0, 0, 0.19)',
          minWidth: '160px',
          backgroundColor: '#30333F',
          borderRadius: '4px', // Adicione a propriedade borderRadius para evitar as pontinhas cinzas
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
