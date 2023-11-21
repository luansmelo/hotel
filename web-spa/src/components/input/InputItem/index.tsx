// InputItem.tsx
import React from 'react'
import styles from './styles.module.scss'
import { InputItemProps } from './types'

const InputItem: React.FC<InputItemProps> = ({ input }) => {
  return (
    <tr className={styles.tr}>
      <th>{input.name}</th>
      <th>{input.unitPrice.toFixed(0)}</th>
      <th>{input.measurementUnit}</th>
      <th>{input.code}</th>
      {/* <th>{String(input.grammage).replace('.', ',')}</th> */}
      <th>{input.group}</th>
    </tr>
  )
}

export default InputItem
