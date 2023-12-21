import React from 'react'
import { Pagination, PaginationItem } from '@mui/material'
import styles from './styles.module.scss'
import ListItem from '@/components/listItem/Index'
import { Skeleton } from '@mui/material'
import { ProductListProps, ProductProps } from '../types'
import Image from 'next/image'
function ProductList({
  productList,
  loading,
  handleDelete,
  handleSelectProduct,
  handleDetailModal,
  openEditModal,
  openAddInputModal,
}: ProductListProps) {
  const itemsPerPage = 5
  const [currentPage, setCurrentPage] = React.useState(0)

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page - 1)
  }
  const offset = currentPage * itemsPerPage
  const paginatedItems = productList?.slice(offset, offset + itemsPerPage)

  const skeletonCell = (
    <Skeleton
      height={36}
      sx={{
        padding: '4px 8px 4px 8px',
        '&:nth-child(odd)': {
          background: '#272a34',
        },
        backgroundColor: '#30333F',
      }}
      variant="rectangular"
      width="100%"
    />
  )

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <tbody className={styles.tbody}>
          {loading ? (
            <tr>
              {Array.from({ length: itemsPerPage }).map((_, colIndex) => (
                <React.Fragment key={colIndex}>{skeletonCell}</React.Fragment>
              ))}
            </tr>
          ) : (
            paginatedItems?.map((product) => (
              <ListItem
                key={product.id}
                actions={[
                  {
                    label: 'Adicionar insumo',
                    onClick: () => {
                      openAddInputModal()
                      handleSelectProduct(product as ProductProps)
                    },
                  },
                  {
                    label: 'Visualizar prato',
                    onClick: () => {
                      handleDetailModal()
                      handleSelectProduct(product as ProductProps)
                    },
                  },
                ]}
                onDelete={() => handleDelete(product.id!)}
                onEdit={() => {
                  openEditModal()
                  handleSelectProduct(product as ProductProps)
                }}
              >
                <div className={styles.product}>
                  <Image
                    src="https://bakeandcakegourmet.com.br/uploads/site/receitas/strogonoff-de-frango-6xp9zh2o.jpg"
                    alt={product.name}
                    width={70}
                    height={50}
                    className={styles.image}
                  />
                  <p>{product.name}</p>
                </div>
              </ListItem>
            ))
          )}
        </tbody>
        {!loading && productList && productList.length > itemsPerPage && (
          <Pagination
            count={Math.ceil((productList?.length || 1) / itemsPerPage)}
            page={currentPage + 1}
            onChange={handlePageChange}
            className={styles.pagination}
            renderItem={(item) => (
              <PaginationItem
                component="span"
                {...item}
                sx={{
                  cursor: 'pointer',
                  color: '#bdbdbd',
                  margin: '0 5px',
                  padding: '8px 12px',
                  borderRadius: '0.25rem',
                  textAlign: 'center',
                  textDecoration: 'none',
                  transition: 'background-color 0.3s',
                  backgroundColor: '#1F2128',
                }}
                classes={{
                  root: styles.page,
                  selected: styles.active,
                }}
              />
            )}
          />
        )}
      </table>
    </div>
  )
}

export default ProductList
