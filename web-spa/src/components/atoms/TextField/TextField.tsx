import styles from './TextField.module.css'
import { ITextFieldProps } from './types'

const TextField = ({ label, value, onChange, type }: ITextFieldProps) => {
  return (
    <input
      type={type}
      className={styles.textField}
      value={value}
      onChange={onChange}
      placeholder={label}
    />
  )
}

export default TextField
