import React from 'react'
import { InputTableCellProps } from './types'
import styles from './styles.module.scss'

const InputTableCell: React.FC<InputTableCellProps> = ({
  value,
}: InputTableCellProps) => {
  return <td className={styles.cell}>{value}</td>
}

export default InputTableCell
