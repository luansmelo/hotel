import styles from './styles.module.scss'
import React from 'react'

export interface TableItem {
  id: string
  [key: string]: any
}

interface TableRootProps {
  children: React.ReactNode
}

const TableRoot: React.FC<TableRootProps> = ({ children }) => {
  return <table className={styles.tableRoot}>{children}</table>
}

export default TableRoot
