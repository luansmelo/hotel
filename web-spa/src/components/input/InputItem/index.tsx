'use client'
import React, { useState } from 'react'
import styles from './styles.module.scss'
import { InputItemProps } from './types'
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'

import { Trash2 } from 'lucide-react'

const InputItem: React.FC<InputItemProps> = ({ input, handleDelete }) => {
  const [openDialog, setOpenDialog] = useState(false)

  const handleClickOpen = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleConfirmDelete = () => {
    handleDelete(input.id)
    handleCloseDialog()
  }

  return (
    <tr className={styles.tr}>
      <th>{input.name}</th>
      <th>{input.unitPrice.toFixed(0)}</th>
      <th>{input.measurementUnit}</th>
      <th>{input.code}</th>
      <th>{input.group}</th>
      <td>
        <IconButton onClick={handleClickOpen}>
          <Trash2 color="red" />
        </IconButton>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Confirmação</DialogTitle>
          <DialogContent>
            Tem certeza de que deseja excluir este item?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleConfirmDelete} color="primary">
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </td>
    </tr>
  )
}

export default InputItem
