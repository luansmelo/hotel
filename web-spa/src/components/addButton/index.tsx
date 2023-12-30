import { LucideIcon } from 'lucide-react'
import styles from './styles.module.scss'
import { Ring } from 'react-cssfx-loading'

interface AddButtonProps {
  text: string
  onClickButton?: () => void
  Icon?: LucideIcon
  isButtonDisabled?: boolean
  loading?: boolean
  colorLoading?: string
}

export default function AddButton({
  text,
  onClickButton,
  isButtonDisabled,
  loading,
  colorLoading = '#0488A6',
}: AddButtonProps) {
  return (
    <button
      className={`${styles.AddButtonContainer} ${
        isButtonDisabled || loading ? styles.DisabledButton : ''
      }`}
      onClick={onClickButton}
      disabled={isButtonDisabled || loading}
    >
      {loading ? (
        <Ring color={colorLoading} width="60px" height="32px" duration="1s" />
      ) : (
        <>
          <p>{text}</p>
        </>
      )}
    </button>
  )
}
