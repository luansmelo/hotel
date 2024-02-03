import styles from './menuButton.module.css'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { MouseEvent } from 'react'

interface MenuButtonProps {
  Icon: LucideIcon
  text: string
  selectedFeature: string
  active: boolean
  isMinimized?: boolean
  onClick?: (event: MouseEvent<HTMLDivElement>) => void
}

const MenuButton: React.FC<MenuButtonProps> = ({
  Icon,
  text,
  selectedFeature,
  active,
  isMinimized,
  onClick,
}: MenuButtonProps) => {
  const buttonClassName = active
    ? `${styles.mainButton} ${styles.mainButtonActivated}`
    : styles.mainButton

  const containerClassName = isMinimized ? `${styles.minimized}` : ''

  return (
    <Link href={`/kitchen/${selectedFeature}`} passHref>
      <div
        className={`${buttonClassName} ${containerClassName}`}
        onClick={onClick}
      >
        <Icon
          size={18}
          color={active ? 'white' : '#04B2D9'}
          fill={active ? 'white' : 'none'}
        />
        {!isMinimized && <div className={styles.menuButtonText}>{text}</div>}
      </div>
    </Link>
  )
}

export default MenuButton
