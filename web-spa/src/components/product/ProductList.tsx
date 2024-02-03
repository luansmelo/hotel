import React, { ReactNode, useEffect, useState } from 'react'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import TableCell from '@mui/material/TableCell'
import { Table, TableBody, TableHead, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'
import TablePagination from '@mui/material/TablePagination'
import Backdrop from '@mui/material/Backdrop'

import { PRODUCT_COLUMNS } from '@/constants/tableHeader'
import { Hypnosis } from 'react-cssfx-loading'
import { TableItem } from '../table/types'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: '#BDBDBD',
  padding: '12px 8px',
  borderBottom: 'none !important',
  '&.${tableCellClasses.body}': {
    fontSize: 14,
    border: 'none',
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#272a34',
  },
  '& td': {
    borderBottom: 'none',
  },
  '&:last-child td, &:last-child th': {
    borderBottom: 'none',
  },
}))

interface InputListProps {
  itemList: TableItem[]
  children: (input: TableItem) => ReactNode
  itemsPerPage?: number
}

const ProductTable: React.FC<InputListProps> = ({
  itemList,
  itemsPerPage = 10,
  children,
}) => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(itemsPerPage)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setLoading(false)
    }

    fetchData()
  }, [])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const tableContainerHeight = Math.min(itemsPerPage * 48 + 56, 440)

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper
      sx={{
        width: '100%',
        overflow: 'hidden',
        background: 'transparent',
        minHeight: '300px',
      }}
    >
      {loading && (
        <Backdrop
          open={loading}
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Hypnosis color="#04B2D9" />
        </Backdrop>
      )}

      {!loading && (
        <TableContainer
          component={Paper}
          sx={{
            background: '#30333F',
            maxHeight: tableContainerHeight,
            width: '100%',
            overflowX: 'auto',
            minHeight: tableContainerHeight,
          }}
        >
          <Table
            stickyHeader
            sx={{ minWidth: 700 }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                {PRODUCT_COLUMNS.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    sx={{ background: '#1F2128' }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
                <StyledTableCell
                  sx={{ background: '#1F2128' }}
                  align="right"
                ></StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {itemList.length === 0 ? (
                <StyledTableRow>
                  <StyledTableCell colSpan={PRODUCT_COLUMNS.length + 1}>
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                      Nenhum item para exibir.
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ) : (
                itemList
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell>{row.name}</StyledTableCell>
                      <StyledTableCell>{row.description}</StyledTableCell>
                      <StyledTableCell align="right">
                        {children(row)}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {!loading && (
        <TablePagination
          sx={{
            background: '#1F2128',
            color: '#BDBDBD',
          }}
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={itemList?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  )
}

export default ProductTable
