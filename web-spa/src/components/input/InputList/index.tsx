import React from 'react'
import { Pagination, PaginationItem } from '@mui/material'
import styles from './styles.module.scss'
import { InputListProps } from './types'
import ListItem from '@/components/listItem/Index'
import { Skeleton } from '@mui/material'

function InputList({
  inputList,
  loading,
  handleDelete,
  handleSelectInput,
  openEditModal,
}: InputListProps) {
  const itemsPerPage = 7
  const [currentPage, setCurrentPage] = React.useState(0)

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page - 1)
  }

  const offset = currentPage * itemsPerPage
  const paginatedItems = inputList?.slice(offset, offset + itemsPerPage)

  const skeletonCell = (
    <Skeleton
      height={60}
      sx={{
        padding: '1.5rem',
        '&:nth-child(odd)': {
          background: '#272a34',
        },
        backgroundColor: '#30333F',
      }}
      variant="rectangular"
      width="100%"
      animation="wave"
    />
  )

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <tbody className={styles.tbody}>
          {loading ? (
            <tr>
              {Array.from({ length: 7 }).map((_, colIndex) => (
                <React.Fragment key={colIndex}>{skeletonCell}</React.Fragment>
              ))}
            </tr>
          ) : (
            paginatedItems?.map((input) => (
              <ListItem
                key={input.id}
                onDelete={() => handleDelete(input.id)}
                onEdit={() => {
                  openEditModal()
                  handleSelectInput(input)
                }}
              >
                <>
                  <td>{input.name}</td>
                  <td>{input.unitPrice.toFixed(0)}</td>
                  <td>{input.measurementUnit}</td>
                  <td>{input.code}</td>
                  <td>{input.group}</td>
                </>
              </ListItem>
            ))
          )}
        </tbody>
      </table>
      {!loading && inputList && inputList.length > itemsPerPage && (
        <Pagination
          count={Math.ceil((inputList?.length || 1) / itemsPerPage)}
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
    </div>
  )
}

export default InputList
