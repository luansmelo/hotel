interface ListItemProps {
  children: React.ReactNode
  actions?: { label: string; onClick: () => void }[]
}

export const DropDownContent = () => {
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
    <div className={styles.buttonContainer}>
      <IconButton onClick={handleClick}>
        <MoreHorizontal color="#04B2D9" />
      </IconButton>
      <Dropdown
        anchorEl={anchorEl}
        onClose={handleClose}
        actions={[
          ...actions!,
          { label: 'Editar', onClick: handleEditClick, icon: <Pencil /> },
          {
            label: 'Excluir',
            onClick: handleDeleteClick,
            icon: <Trash2 />,
          },
        ]}
      />
    </div>
  )
}
