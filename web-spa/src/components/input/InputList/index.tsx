import React, { useState } from 'react'
import styles from './styles.module.scss'
import { Input, InputListProps } from '../types'
import TableHeader from '@/components/atoms/TableHeader'
import PaginationComponent from '../../pagination'
import SkeletonCell from '@/components/skeleton'

const InputList: React.FC<InputListProps> = ({
  loading,
  itemList,
  headers,
  actions,
}: InputListProps) => {
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(0)
  const dynamicFields: (keyof Input)[] = [
    'name',
    'unitPrice',
    'measurementUnit',
    'code',
    'group',
  ]
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const offset = currentPage * itemsPerPage
  const paginatedItems = itemList?.slice(offset, offset + itemsPerPage)

  return (
    <div>
      <TableHeader headers={headers} />
      {loading ? (
        <div>
          {Array.from({ length: itemsPerPage }).map((_, colIndex) => (
            <SkeletonCell key={colIndex} colIndex={colIndex} height={36} />
          ))}
        </div>
      ) : (
        <div className={styles.container}>
          {paginatedItems?.map((item) => (
            <ul key={item.id} className={styles.ul}>
              {dynamicFields.map((field) => (
                <li key={field}>{item[field]}</li>
              ))}
              <div>
                {actions.map((action, index) => (
                  <span
                    key={index}
                    className={styles.productEdit}
                    onClick={() => action.onClick(item)}
                  >
                    {action.icon}
                  </span>
                ))}
              </div>
            </ul>
          ))}
        </div>
      )}
      {paginatedItems && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={Math.ceil((itemList?.length || 1) / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default InputList
