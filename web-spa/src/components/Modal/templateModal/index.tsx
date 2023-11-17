import { X } from 'lucide-react'
import styles from './styles.module.scss'

interface IModalTemplateProps {
  title: string
  headColor: string
  onClose: () => void
  children: React.ReactNode
}
export default function TemplateModal({
  title,
  headColor,
  onClose,
  children,
}: IModalTemplateProps) {
  return (
    <div className={styles.modalContainer}>
      <div style={{ background: headColor }} className={styles.modalHeader}>
        <p>{title}</p>

        <span onClick={onClose}>
          <X color="white" />
        </span>
      </div>

      <div>{children}</div>
    </div>
  )
}
