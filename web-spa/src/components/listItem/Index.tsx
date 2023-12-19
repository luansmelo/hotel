import { IconButton } from '@mui/material'
import { MoreHorizontal } from 'lucide-react'
import Dropdown from '../dropDown'
import styles from './styles.module.scss'
import ConfirmDialog from '../dialog'
import { useState } from 'react'

interface ListItemProps {
  children: React.ReactNode
  onDelete: () => void
  onEdit: () => void
  actions?: { label: string; onClick: () => void }[]
}
const ListItem = ({
  children,
  onDelete,
  onEdit,
  actions = [],
}: ListItemProps) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDeleteClick = () => {
    setIsConfirmDialogOpen(true)
  }

  const handleEditClick = () => {
    onEdit()
    handleClose()
  }
  const handleDropdownClose = () => {
    handleClose()
    setIsConfirmDialogOpen(false)
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
            ...actions!,
            { label: 'Editar', onClick: handleEditClick },
            { label: 'Excluir', onClick: handleDeleteClick },
          ]}
        />
      </div>

      <ConfirmDialog
        open={isConfirmDialogOpen}
        onClose={handleDropdownClose}
        onConfirm={onDelete}
      />
    </tr>
  )
}

export default ListItem
