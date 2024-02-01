'use client'
import React, { ReactNode } from 'react'
import { TableItem } from '@/components/Item/TableRoot'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import TableCell from '@mui/material/TableCell'
import { Table, TableBody, TableHead, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'
import {
  INPUT_MANIPULATION_COLUMNS,
  PRODUCT_DETAILS_COLUMNS,
} from '@/constants/tableHeader'

import TablePagination from '@mui/material/TablePagination'
import Select from '@/components/select'
import TextField from '@/components/textField/TextField'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: '#BDBDBD',
  padding: '8px 8px', // Adjust the padding for table header cells
  borderBottom: 'none !important', // Remove the bottom border in the header cells
  '&.${tableCellClasses.body}': {
    fontSize: 14,
    // padding: '8px 8px', // Adjust the padding for table body cells
    border: 'none',
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // background: '#30333F',
  padding: '8px 8px',
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
  inputState: any
  setInputState: any
  measurementUnitList: TableItem[]
  itemList: TableItem[]
  children: (input: TableItem) => ReactNode
  itemsPerPage?: number
}

const InputTableManipulation: React.FC<InputListProps> = ({
  inputState,
  setInputState,
  itemList,
  measurementUnitList,
  children,
}) => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

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
              {INPUT_MANIPULATION_COLUMNS.map((column) => (
                <StyledTableCell key={column.id} sx={{ background: '#1F2128' }}>
                  {column.label}
                </StyledTableCell>
              ))}
              <StyledTableCell sx={{ background: '#1F2128' }}></StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {itemList.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell
                  colSpan={INPUT_MANIPULATION_COLUMNS.length + 1}
                >
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    No items to display.
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
                      <Select
                        key={row.id}
                        name={'measurementUnit'}
                        data={measurementUnitList!}
                        width="200px"
                        placeholder={row.measurementUnit}
                        value={inputState[row.name]?.measurementUnit}
                        onClick={(event) => {
                          const { value } = event.target
                          setInputState((prevState) => ({
                            ...prevState,
                            [row.name]: {
                              ...prevState[row.name],
                              measurementUnit: value || '0',
                            },
                          }))
                        }}
                        errors={''}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        key={row.id}
                        label="Gramatura"
                        name={`grammage`}
                        width={200}
                        value={inputState[row.name]?.grammage}
                        defaultValue={String(row.grammage)}
                        onChange={(event) => {
                          const { value } = event.target

                          setInputState((prevState) => ({
                            ...prevState,
                            [row.name]: {
                              ...prevState[row.name],
                              grammage: value,
                            },
                          }))
                        }}
                        errors={''}
                      />
                    </StyledTableCell>
                    <StyledTableCell>{children(row)}</StyledTableCell>
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

export default InputTableManipulation
