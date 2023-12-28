import { Trash2 } from 'lucide-react'
import styles from './styles.module.scss'
import { TrashProps } from './types'
function Trash({ color, onClick }: TrashProps) {
  return (
    <div onClick={onClick} className={styles.productActionDelete}>
      <Trash2 size={20} color={color || '#FFF'} />
    </div>
  )
}

export default Trash
