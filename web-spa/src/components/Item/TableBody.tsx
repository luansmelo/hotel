import React, { useState } from 'react'
import TableRow from './TableRow'
import { TableItem } from './TableRoot'
import Pagination from '../pagination'
import NoData from '../listItem/NoData'
import styles from './styles.module.scss'

interface TableBodyProps<T extends TableItem> {
  loading: boolean
  itemsPerPage: number
  itemList: T[]
  renderRow: (item: TableItem) => React.ReactNode
}

const TableBody: React.FC<TableBodyProps<TableItem>> = ({
  loading,
  itemList,
  itemsPerPage,
  renderRow,
}) => {
  const [currentPage, setCurrentPage] = useState(0)

  const paginatedItems = React.useMemo(() => {
    const offset = currentPage * itemsPerPage
    return itemList?.slice(offset, offset + itemsPerPage) || []
  }, [currentPage, itemsPerPage, itemList])

  const totalItems = itemList?.length || 0
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const showPagination = paginatedItems.length > 0

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <>
      <tbody className={styles.tableBody}>
        {loading ? (
          <span>Loading...</span>
        ) : !paginatedItems.length ? (
          <NoData height={300} />
        ) : (
          <>
            {paginatedItems.map((item) => (
              <TableRow key={item.id}>{renderRow(item)} </TableRow>
            ))}
          </>
        )}
      </tbody>
      {showPagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  )
}

export default TableBody
