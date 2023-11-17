import styles from './menuButton.module.css'
import { LucideIcon } from 'lucide-react'

interface MenuButtonProps {
  Icon: LucideIcon
  text: string
  active: boolean
  // onClickMenuButton: (input: string) => void
  // selectedFeature: string
}

export default function MenuButton({ active, Icon, text }: MenuButtonProps) {
  const activatedClass = active ? styles.mainButtonActivated : ''
  const classes = `${styles.mainButton} ${activatedClass}`

  return (
    <button className={classes}>
      <Icon size={32} />
      {text}
    </button>
  )
}
