import { ReactNode } from 'react'
import styles from './styles.module.scss'

interface BaseItem {
  id?: string
  name: string
  children?: ReactNode
}

interface ListItemProps<T extends BaseItem> {
  data: T[]
  visibleFields: Array<keyof T>
  onSelectItem?: (item: T) => void
}

const ListItem = <T extends BaseItem>({
  data,
  visibleFields,
  children,
  onSelectItem,
}: ListItemProps<T> & { children?: ReactNode }) => {
  return (
    <div className={styles.container}>
      <ul className={styles.ul}>
        {data?.map((item) => (
          <li key={item.id} onClick={() => onSelectItem && onSelectItem(item)}>
            {visibleFields.map((field) => (
              <div key={field as string}>{String(item[field])}</div>
            ))}
            <span>{children}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListItem
