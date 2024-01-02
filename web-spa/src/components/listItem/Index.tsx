import { useState } from 'react'
import styles from './styles.module.scss'
import TableHeader from '@/components/atoms/TableHeader'
import PaginationComponent from '@/components/pagination'
import SkeletonCell from '@/components/skeleton'
import { Action } from './types'
import { SearchX } from 'lucide-react'

export interface GenericListProps<T extends { id: string }> {
  loading: boolean
  itemList?: T[]
  headers: string[]
  actions: Action<T>[]
  dynamicFields: (keyof T)[]
}

const ListItem = <T extends { id: string }>({
  loading,
  itemList,
  headers,
  actions,
  dynamicFields,
}: GenericListProps<T>) => {
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(0)

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
            <SkeletonCell key={colIndex} colIndex={colIndex} />
          ))}
        </div>
      ) : (
        <div className={styles.container}>
          {paginatedItems?.length === 0 ? (
            <div className={styles.noData}>
              <SearchX size={80} color="#F56D15" />
            </div>
          ) : (
            <>
              {paginatedItems?.map((item) => (
                <ul key={item.id} className={styles.ul}>
                  {dynamicFields.map((field) => (
                    <li key={Number(field)}>{String(item[field])}</li>
                  ))}
                  <div className={styles.iconContainer}>
                    {actions.map((action, index) => (
                      <span
                        key={index}
                        className={`${styles.productEdit} ${
                          action.actionClass ? styles[action.actionClass] : ''
                        }`}
                        onClick={() => action.onClick(item)}
                      >
                        {action.icon}
                      </span>
                    ))}
                  </div>
                </ul>
              ))}
            </>
          )}
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

export default ListItem
