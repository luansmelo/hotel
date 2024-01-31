'use client'
import styles from './styles.module.scss'

interface TableHeaderProps {
  visibleProperties: string[]
}

const TableHeader: React.FC<TableHeaderProps> = ({ visibleProperties }) => (
  <thead className={styles.tableHeader}>
    <tr>
      {visibleProperties.map((property) => (
        <th key={property} className={styles.tableColumnHeader}>
          {property}
        </th>
      ))}
      <th></th>
    </tr>
  </thead>
)

export default TableHeader
