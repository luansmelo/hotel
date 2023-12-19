import { ChangeEvent } from 'react'
import styles from './styles.module.scss'

interface CustomTextAreaProps {
  value: string
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
  rows: number
}

const CustomTextArea = ({ value, onChange, rows }: CustomTextAreaProps) => {
  return (
    <div className={styles.customTextArea}>
      <div className={styles.textAreaContainer}>
        <textarea
          className={styles.textArea}
          rows={rows}
          value={value}
          onChange={onChange || (() => {})}
        />
      </div>
    </div>
  )
}

export default CustomTextArea
