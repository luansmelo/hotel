import { FEATURES } from '@/context/AppContext'
import styles from './menuButton.module.css'
import { LucideIcon } from 'lucide-react'

interface MenuButtonProps {
  Icon: LucideIcon
  text: string
  active: boolean
  onClickMenuButton: (newPage: FEATURES) => void
  selectedFeature: FEATURES
}

export default function MenuButton({
  active,
  Icon,
  text,
  onClickMenuButton,
  selectedFeature,
}: MenuButtonProps) {
  const activatedClass = active ? styles.mainButtonActivated : ''
  const classes = `${styles.mainButton} ${activatedClass}`

  return (
    <button
      className={classes}
      onClick={() => onClickMenuButton(selectedFeature)}
    >
      <Icon size={32} />
      {text}
    </button>
  )
}
