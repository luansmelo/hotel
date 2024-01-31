import React from 'react'
import { TableHeaderProps } from './types'
import styles from './styles.module.scss'

const TableHeader: React.FC<TableHeaderProps> = ({
  headers,
}: TableHeaderProps) => (
  <thead className={styles.thead}>
    <tr>
      {headers.map((header, index) => (
        <th key={index} className={styles.columnHeader}>
          {header}
        </th>
      ))}
    </tr>
  </thead>
)

export default TableHeader
