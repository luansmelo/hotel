import { Eye, Trash2 } from 'lucide-react'
import styles from './styles.module.scss'
import { FEATURES, useAppContext } from '@/context/AppContext'
import { IProductProps } from '@/atom/business'

interface IProductListItemProps {
  product: IProductProps
}
export default function ProductListItem({ product }: IProductListItemProps) {
  const { setCurrentFeature } = useAppContext()
  return (
    <div className={styles.productItemContainer}>
      <div className={styles.productItemContent}>
        <div className={styles.productItemDescription}>
          <h4>{product.name}</h4>
        </div>
      </div>

      <div className={styles.productItemActions}>
        <div
          className={styles.productActionView}
          onClick={() => setCurrentFeature(FEATURES.PRODUCT_DETAILS)}
        >
          <Eye color="#D96262" size={24} />
        </div>
        <div className={styles.productActionDelete}>
          <Trash2 color="white" size={24} />
        </div>
      </div>
    </div>
  )
}
