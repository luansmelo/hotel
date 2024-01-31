'use client'
import React, { ReactNode } from 'react'
import { Item } from '../Item'
import { TableItem } from '../Item/TableRoot'
import { ProductProps } from './types'
import { TABLE_HEADERS_PRODUCT } from '@/constants/tableHeader'

interface ProductListProps {
  loading: boolean
  itemList: ProductProps[]
  children: (product: TableItem) => ReactNode
}

const ProductList: React.FC<ProductListProps> = ({
  loading,
  itemList,
  children,
}) => {
  return (
    <Item.Root>
      <Item.Header visibleProperties={TABLE_HEADERS_PRODUCT} />
      <Item.Body
        loading={loading}
        itemList={itemList}
        itemsPerPage={10}
        renderRow={(product: TableItem) => (
          <>
            <Item.Cell>{product.name}</Item.Cell>
            <Item.Actions>{children(product)}</Item.Actions>
          </>
        )}
      />
    </Item.Root>
  )
}

export default ProductList
