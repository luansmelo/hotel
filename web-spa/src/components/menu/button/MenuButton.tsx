import styles from './menuButton.module.css'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { MouseEvent } from 'react'

interface MenuButtonProps {
  Icon: LucideIcon
  text: string
  selectedFeature: string
  active: boolean
  onClick?: (event: MouseEvent<HTMLDivElement>) => void
}

const MenuButton: React.FC<MenuButtonProps> = ({
  Icon,
  text,
  selectedFeature,
  active,
  onClick,
}: MenuButtonProps) => {
  const buttonClassName = active
    ? `${styles.mainButton} ${styles.mainButtonActivated}`
    : styles.mainButton

  return (
    <Link href={`/kitchen/${selectedFeature}`} passHref>
      <div className={buttonClassName} onClick={onClick}>
        <Icon size={32} />
        {text}
      </div>
    </Link>
  )
}

export default MenuButton
