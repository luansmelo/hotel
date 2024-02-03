'use client'
import { ProductWeekDay } from '@/utils/interfaces/category'
import styles from './styles.module.scss'
import { SearchX } from 'lucide-react'
import { Trash2 } from 'lucide-react'
interface ITableProductsProps {
  onDelete: (productId: string) => void
  productData: ProductWeekDay[]
}

export default function AddProductTable({
  productData,
  onDelete,
}: ITableProductsProps) {
  return (
    <div className={styles.containerWrapper}>
      <table className={styles.table}>
        {productData.length === 0 ? (
          <div
            style={{
              width: '100%',
              height: '160px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <SearchX size={80} color="#F56D15" />
          </div>
        ) : (
          <div className={styles.tbodyContainer}>
            <tbody className={styles.tbody}>
              {productData.map((product) => (
                <tr key={product.productId} className={styles.tr}>
                  <td>{product.name}</td>
                  <td>
                    <Trash2 onClick={() => onDelete(product.productId)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </div>
        )}
      </table>
    </div>
  )
}
