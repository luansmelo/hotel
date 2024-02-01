'use client'
import { ReactNode } from 'react'
import styles from './styles.module.scss'

interface TableHeaderProps {
  children: ReactNode
}

const TableHeader: React.FC<TableHeaderProps> = ({ children }) => (
  <thead className={styles.tableHeader}>{children}</thead>
)

export default TableHeader
