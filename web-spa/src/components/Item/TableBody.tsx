import React, { useState } from 'react'
import TableRow from './TableRow'
import TableHeader from './TableHeader'
import { TableItem } from './TableRoot'
import Pagination from '../pagination'
import NoData from '../listItem/NoData'
import styles from './styles.module.scss'
import { TABLE_HEADERS_PRODUCT_DETAILS } from '@/constants/tableHeader'

interface TableBodyProps<T extends TableItem> {
  loading: boolean
  itemsPerPage: number
  itemList: T[]
  renderRow: (item: TableItem) => React.ReactNode
}

const TableBody: React.FC<TableBodyProps<TableItem>> = ({
  itemList,
  renderRow,
}) => {
  return (
    <tbody className={styles.tableBody}>
      {itemList.map((item) => (
        <TableRow key={item.id}>{renderRow(item)} </TableRow>
      ))}
    </tbody>
  )
}

export default TableBody
