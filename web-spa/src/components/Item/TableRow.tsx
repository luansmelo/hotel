import styles from './styles.module.scss'

interface TableRowProps {
  children: React.ReactNode
}

const TableRow: React.FC<TableRowProps> = ({ children }) => (
  <tr className={styles.tableRow}>{children}</tr>
)

export default TableRow
