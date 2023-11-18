import React from 'react'
import { TableHeaderProps } from './types'
import styles from './styles.module.scss'
const TableHeader: React.FC<TableHeaderProps> = ({
  headers,
}: TableHeaderProps) => (
  <table className={styles.table}>
    <thead className={styles.thead}>
      <tr className={styles.tr}>
        {headers.map((header, index) => (
          <th key={index} className={styles.th}>
            <div className={styles.text_container}>{header}</div>
          </th>
        ))}
      </tr>
    </thead>
  </table>
)

export default TableHeader
