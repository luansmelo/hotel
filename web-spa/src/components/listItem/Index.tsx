import React, { useState } from 'react'
import { IconButton } from '@mui/material'
import { MoreHorizontal } from 'lucide-react'
import Dropdown from '../dropDown'
import styles from './styles.module.scss'

interface ListItemProps {
  children: React.ReactNode
  onDelete: () => void
  onEdit: () => void
}

const ListItem: React.FC<ListItemProps> = ({ children, onDelete, onEdit }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleConfirmDelete = () => {
    onDelete()
    handleClose()
  }

  const handleEdit = () => {
    onEdit()
    handleClose()
  }

  return (
    <tr className={styles.tr}>
      <div className={styles.contentContainer}>{children}</div>
      <div className={styles.buttonContainer}>
        <IconButton onClick={handleClick}>
          <MoreHorizontal color="#04B2D9" />
        </IconButton>
        <Dropdown
          anchorEl={anchorEl}
          onClose={handleClose}
          actions={[
            { label: 'Editar', onClick: handleEdit },
            { label: 'Excluir', onClick: handleConfirmDelete },
          ]}
        />
      </div>
    </tr>
  )
}

export default ListItem
