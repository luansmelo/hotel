import styles from './styles.module.scss'
import { InputListProps } from './types'
import ListItem from '@/components/listItem/Index'

function InputList({ inputList, handleDelete, handleEdit }: InputListProps) {
  return (
    <>
      <table className={styles.table}>
        <tbody className={styles.tbody}>
          {inputList?.map((input) => (
            <ListItem
              key={input.id}
              onDelete={() => handleDelete(input.id)}
              onEdit={() => handleEdit && handleEdit(input)}
              input={input}
            >
              <>
                <th>{input.name}</th>
                <th>{input.unitPrice.toFixed(0)}</th>
                <th>{input.measurementUnit}</th>
                <th>{input.code}</th>
                <th>{input.group}</th>
              </>
            </ListItem>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default InputList
