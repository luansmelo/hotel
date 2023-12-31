import React from 'react'
import { Pagination, PaginationItem } from '@mui/material'
import styles from './styles.module.scss'
import { PaginationComponentProps } from './types'

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <Pagination
      count={totalPages}
      page={currentPage + 1}
      onChange={(_, page) => onPageChange(page - 1)}
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
  )
}

export default PaginationComponent
