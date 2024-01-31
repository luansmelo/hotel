import React from 'react'
import styles from './styles.module.scss'

interface ListItemElementProps<T> {
  item: T
  actions?: React.ReactNode
}

const ListItemElement = <T extends { id: string }>({
  item,
  actions,
  children,
}: React.PropsWithChildren<ListItemElementProps<T>>) => (
  <div className={styles.listItem}>
    {children ? children : <span>{item.toString()}</span>}
    {actions && <div className={styles.iconContainer}>{actions}</div>}
  </div>
)

export default ListItemElement
