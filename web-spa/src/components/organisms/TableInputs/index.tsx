import { IInputsProps } from '@/atom/business'
import styles from './styles.module.scss'
import InputLine from './InputLine'

interface ITableInputsProps {
  inputs: IInputsProps[]
  openEdit?: boolean
}
export default function TableInputs({
  inputs,
  openEdit = false,
}: ITableInputsProps) {
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <td>Nome</td>
        <td>Preço Unitário</td>
        <td>Unidade Medida</td>
      </thead>

      {/* <tbody className={styles.tbody}>
        {inputs.map((input) => {
          return (
            <InputLine key={input.code} input={input} openEdit={openEdit} />
          )
        })}
      </tbody> */}
    </table>
  )
}
