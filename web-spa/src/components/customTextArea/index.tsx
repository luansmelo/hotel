import { ChangeEvent } from 'react'
import styles from './styles.module.scss'

interface CustomTextAreaProps {
  name?: string
  value: string
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
  rows: number
}

const CustomTextArea = ({
  value,
  name,
  onChange,
  rows,
}: CustomTextAreaProps) => {
  return (
    <div className={styles.customTextArea}>
      <textarea
        className={styles.textArea}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange || (() => {})}
        disabled={!onChange}
      />
    </div>
  )
}

export default CustomTextArea
