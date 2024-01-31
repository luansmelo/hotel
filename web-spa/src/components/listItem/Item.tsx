import React, { useState } from 'react'
import styles from './styles.module.scss'
import TableHeader from '../atoms/TableHeader'

interface ItemProps {
  children: React.ReactNode
  onClick?: () => void
}

export const Item: React.FC<ItemProps & { action?: Action<any> }> = ({
  children,
  onClick,
  action,
}) => {
  return <td onClick={onClick}>{children}</td>
}

export interface FieldDefinition<T> {
  key: keyof T
  render: (item: T) => React.ReactNode
}

interface Action<T> {
  label: string
  onClick: (item: T) => void
}

interface ItemListProps<T> {
  items: T[]
  fields: FieldDefinition<T>[]
  actions?: Action<T>[]
  headers: string[]
}

export const ItemList = <T extends { id: string }>({
  items,
  fields,
  actions,
  headers,
}: ItemListProps<T>) => {
  const [activeItem, setActiveItem] = useState<T | null>(null)

  const handleItemClick = (item: T) => {
    setActiveItem(item)
  }

  const handleActionClick = (action: Action<T>) => {
    if (activeItem) {
      action.onClick(activeItem)
      setActiveItem(null)
    }
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <TableHeader key={index} headers={headers} />
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr
            key={item.id}
            className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
          >
            {fields.map((field) => (
              <Item
                key={String(field.key)}
                onClick={() => handleItemClick(item)}
                action={actions?.find((action) => action.label === field.key)}
              >
                {field.render(item)}
              </Item>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
