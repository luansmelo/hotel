import { ButtonProps } from './types'
import styles from './styles.module.scss'
import { Ring } from 'react-cssfx-loading'

export default function Button({
  text,
  disabled,
  loading,
  color = '#0488A6',
  height,
  width,
  onSubmit,
}: ButtonProps) {
  const buttonStyle = {
    height: height || '40px',
    width: width || '100%',
  }

  return (
    <button
      className={styles.button}
      style={buttonStyle}
      onClick={onSubmit}
      disabled={disabled || loading}
    >
      {loading ? (
        <Ring color={color} width="60px" height="32px" duration="1s" />
      ) : (
        <>
          <p>{text}</p>
        </>
      )}
    </button>
  )
}
