import React from 'react'
import { Modal as MuiModal, Fade, Backdrop } from '@mui/material'
import styles from './styles.module.scss'
import TemplateModal from '../templateModal'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  return (
    <TemplateModal onClose={onClose} title={'title'} headColor="">
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
    </TemplateModal>
  )
}

export default Modal
