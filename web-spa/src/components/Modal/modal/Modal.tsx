import React from 'react'
import { Modal as MuiModal, Fade, Backdrop } from '@mui/material'
import styles from './styles.module.scss'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  return (
    <MuiModal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={styles.modal}>{children}</div>
      </Fade>
    </MuiModal>
  )
}

export default Modal
