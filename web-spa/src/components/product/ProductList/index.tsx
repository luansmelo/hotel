import React from 'react'
import styles from './styles.module.scss'
import ListItem from '@/components/listItem/Index'
import { ProductListProps } from '../types'
import SkeletonCell from '@/components/skeleton'
import PaginationComponent from '@/components/pagination'
function ProductList({ productList, loading }: ProductListProps) {
  const itemsPerPage = 5
  const [currentPage, setCurrentPage] = React.useState(0)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const offset = currentPage * itemsPerPage
  const paginatedItems = productList?.slice(offset, offset + itemsPerPage)

  return (
    <div className={styles.container}>
      {loading ? (
        <div>
          {Array.from({ length: itemsPerPage }).map((_, colIndex) => (
            <SkeletonCell key={colIndex} colIndex={colIndex} height={36} />
          ))}
        </div>
      ) : (
        paginatedItems && (
          <>
            <ListItem data={paginatedItems} visibleFields={['name']} />

            <PaginationComponent
              currentPage={currentPage}
              totalPages={Math.ceil((productList?.length || 1) / itemsPerPage)}
              onPageChange={handlePageChange}
            />
          </>
        )
      )}
    </div>
  )
}

export default ProductList
