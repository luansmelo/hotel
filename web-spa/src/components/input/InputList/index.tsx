import React, { useState } from 'react'
import styles from './styles.module.scss'
import ListItem from '@/components/listItem/Index'
import { InputListProps } from '../types'
import TableHeader from '@/components/atoms/TableHeader'
import PaginationComponent from '../../pagination'
import SkeletonCell from '@/components/skeleton'
import { TABLE_HEADERS_INPUT } from '@/constants/tableHeader'

const InputList: React.FC<InputListProps> = ({
  loading,
  inputList,
  children,
  handleSelectItem,
}: InputListProps) => {
  const itemsPerPage = 6
  const [currentPage, setCurrentPage] = useState(0)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const offset = currentPage * itemsPerPage
  const paginatedItems = inputList?.slice(offset, offset + itemsPerPage)

  return (
    <div className={styles.container}>
      <TableHeader headers={TABLE_HEADERS_INPUT} />

      {loading ? (
        <div>
          {Array.from({ length: itemsPerPage }).map((_, colIndex) => (
            <SkeletonCell key={colIndex} colIndex={colIndex} height={36} />
          ))}
        </div>
      ) : (
        paginatedItems && (
          <>
            <ListItem
              data={paginatedItems}
              visibleFields={[
                'name',
                'unitPrice',
                'measurementUnit',
                'code',
                'group',
              ]}
              onSelectItem={handleSelectItem}
            >
              {children}
            </ListItem>

            <PaginationComponent
              currentPage={currentPage}
              totalPages={Math.ceil((inputList?.length || 1) / itemsPerPage)}
              onPageChange={handlePageChange}
            />
          </>
        )
      )}
    </div>
  )
}

export default InputList
