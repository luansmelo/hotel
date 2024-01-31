import styles from './styles.module.scss'

import React from 'react'

interface TableActionsProps {
  children: React.ReactNode
}

const TableActions: React.FC<TableActionsProps> = ({ children }) => (
  <td className={styles.tableCell}>{children}</td>
)

export default TableActions
