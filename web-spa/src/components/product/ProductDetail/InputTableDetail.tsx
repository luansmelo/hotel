import React from 'react'
import { TableItem } from '@/components/Item/TableRoot'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import TableCell from '@mui/material/TableCell'
import { Table, TableBody, TableHead, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'
import { PRODUCT_DETAILS_COLUMNS } from '@/constants/tableHeader'

import TablePagination from '@mui/material/TablePagination'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: '#BDBDBD',
  padding: '12px 8px', // Adjust the padding for table header cells
  borderBottom: 'none !important', // Remove the bottom border in the header cells
  '&.${tableCellClasses.body}': {
    fontSize: 14,
    // padding: '8px 8px', // Adjust the padding for table body cells
    border: 'none',
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // background: '#30333F',
  border: 'none',
  '&:nth-of-type(odd)': {
    border: 'none',
    backgroundColor: '#272a34',
  },
  // Remove the bottom border in the table body cells
  '& td': {
    borderBottom: 'none',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    borderBottom: 'none',
  },
}))

interface InputListProps {
  itemList: TableItem[]
  itemsPerPage?: number
  convertUnit: (value: number, fromUnit: string, toUnit: string) => number
}

const InputTableDetail: React.FC<InputListProps> = ({
  itemList,
  itemsPerPage = 10,
}) => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(itemsPerPage)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', background: 'transparent' }}>
      <TableContainer component={Paper} sx={{ background: '#30333F' }}>
        <Table
          stickyHeader
          sx={{ minWidth: 700 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              {PRODUCT_DETAILS_COLUMNS.map((column) => (
                <StyledTableCell key={column.id} sx={{ background: '#1F2128' }}>
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {itemList.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={PRODUCT_DETAILS_COLUMNS.length + 1}>
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
                    <StyledTableCell>
                      {row.grammage} {row.measurementUnit}
                    </StyledTableCell>
                    <StyledTableCell>{row.unitPrice}</StyledTableCell>
                  </StyledTableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

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
    </Paper>
  )
}

export default InputTableDetail
