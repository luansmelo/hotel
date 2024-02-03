import React, { Fragment, useState } from 'react'
import TableHeader from '@/components/atoms/TableHeader'
import SkeletonCell from '@/components/skeleton'
import ListItemElement from './ListItemElement'

export interface FieldDefinition<T> {
  key: keyof T
  render: (item: T) => React.ReactNode
}

interface ListItemContainerProps<T> {
  loading: boolean
  itemList?: T[]
  headers: string[]
  height?: number
  actions?: React.ReactNode
  dynamicFields: FieldDefinition<T>[]
}

const ListItemContainer = <T extends { id: string }>({
  loading,
  itemList,
  headers,
  actions,
  dynamicFields,
  height = 400,
}: ListItemContainerProps<T>) => {
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
      ) : paginatedItems?.length === 0 ? (
        // <NoData height={height} />
        <p>Xd</p>
      ) : (
        <Fragment>
          {paginatedItems?.map((item) => (
            <ListItemElement key={item.id} item={item} actions={actions}>
              {dynamicFields.map((fieldDef) => (
                <span key={String(fieldDef.key)}>{fieldDef.render(item)}</span>
              ))}
            </ListItemElement>
          ))}
        </Fragment>
      )}
    </div>
  )
}

export default ListItemContainer
