import React from 'react'
import { TableHeaderProps } from './types'
import styles from './styles.module.scss'

const TableHeader: React.FC<TableHeaderProps> = ({
  headers,
}: TableHeaderProps) => (
  <div className={styles.thead}>
    {headers.map((header, index) => (
      <div key={index} className={styles.columnHeader}>
        {header}
      </div>
    ))}
  </div>
)

export default TableHeader
