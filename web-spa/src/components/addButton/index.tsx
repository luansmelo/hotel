import { LucideIcon, Plus } from 'lucide-react'
import styles from './styles.module.scss'
import { Ring } from 'react-cssfx-loading'

interface AddButtonProps {
  text: string
  onClickButton?: () => void
  Icon?: LucideIcon
  isButtonDisabled?: boolean
  isLoading?: boolean
  colorLoading?: string
}

export default function AddButton({
  text,
  onClickButton,
  Icon = Plus,
  isButtonDisabled,
  isLoading,
  colorLoading = '#FFEF92',
}: AddButtonProps) {
  return (
    <button
      className={`${styles.AddButtonContainer} ${
        isButtonDisabled ? styles.DisabledButton : ''
      }`}
      onClick={onClickButton}
      disabled={isButtonDisabled}
    >
      {isLoading ? (
        <Ring color={colorLoading} width="60px" height="32px" duration="1s" />
      ) : (
        <>
          <Icon color="#ffffff" />
          <p>{text}</p>
        </>
      )}
    </button>
  )
}
