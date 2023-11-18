import InputItem from '@/components/input/InputItem'
import styles from './styles.module.scss'
import { InputListProps } from './types'
function InputList({ inputList }: InputListProps) {
  return (
    <table className={styles.table}>
      <tbody className={styles.tbody}>
        {inputList.map((input) => (
          <InputItem key={input.id} input={input} />
        ))}
      </tbody>
    </table>
  )
}

export default InputList
