import React from 'react'
import { TableHeaderProps } from './types'
import styles from './styles.module.scss'
const TableHeader: React.FC<TableHeaderProps> = ({
  headers,
}: TableHeaderProps) => (
  <thead className={styles.thead}>
    {headers.map((header, index) => (
      <td key={index}> {header}</td>
    ))}
  </thead>
)

export default TableHeader
