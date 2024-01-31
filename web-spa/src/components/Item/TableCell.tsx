'use client'
import styles from './styles.module.scss'

interface TableCellProps {
  children: React.ReactNode
}

const TableCell: React.FC<TableCellProps> = ({ children }) => (
  <td className={styles.tableCell}>{children}</td>
)

export default TableCell
