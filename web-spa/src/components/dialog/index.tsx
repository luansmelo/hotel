import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'
import { ConfirmDialogProps } from './types'
import styles from './styles.module.scss'

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className={styles.confirmDialogTitle}>
        Confirmação
      </DialogTitle>
      <DialogContent className={styles.confirmDialogContent}>
        Tem certeza de que deseja excluir este item?
      </DialogContent>
      <DialogActions className={styles.confirmDialogActions}>
        <Button onClick={onClose} className={styles.confirmDialogCancelButton}>
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          className={styles.confirmDialogConfirmButton}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
