import React, { useState } from 'react'
import { IconButton } from '@mui/material'
import { MoreHorizontal } from 'lucide-react'
import Dropdown from '../dropDown'
import styles from './styles.module.scss'
import ConfirmDialog from '../dialog'
import { InputContract } from '@/atom/business'

interface ListItemProps {
  children: React.ReactNode
  onDelete: () => void
  onEdit: (input: InputContract) => void
  input: InputContract
}

const ListItem: React.FC<ListItemProps> = ({
  children,
  onDelete,
  onEdit,
  input,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [confirmationOpen, setConfirmationOpen] = useState(false)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleConfirmDelete = () => {
    setConfirmationOpen(true)
    handleClose()
  }

  const handleEdit = () => {
    onEdit(input)
    handleClose()
  }

  const handleCancelConfirmation = () => {
    setConfirmationOpen(false)
  }

  const handleConfirmConfirmation = () => {
    onDelete()
    setConfirmationOpen(false)
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

        <ConfirmDialog
          open={confirmationOpen}
          onClose={handleCancelConfirmation}
          onConfirm={handleConfirmConfirmation}
        />
      </div>
    </tr>
  )
}

export default ListItem
