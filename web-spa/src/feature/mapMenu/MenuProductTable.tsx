'use client'
import { IProductProps } from '@/atom/business'
import styles from './styles.module.scss'
import { Eye, Trash2 } from 'lucide-react'

interface ITableProductsProps {
  productData: IProductProps[]
  onClickView?: (product?: IProductProps) => void
  onClickDelete?: () => void
  headColor?: string
  removeEye?: boolean
}
export default function MenuProductTable({
  headColor,
  productData,
  onClickDelete,
  onClickView,
  removeEye,
}: ITableProductsProps) {
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr
            style={{
              background: headColor,
              color: headColor ? '#ffffff' : '#000',
            }}
          >
            <td style={{ color: headColor ? '#ffffff' : '#000' }}>Nome</td>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {productData.map((product) => (
            <tr className={styles.tr} key={product.name}>
              <td>{product.name}</td>
              <td>
                {!removeEye && (
                  <div
                    className={styles.productActionView}
                    onClick={() => onClickView && onClickView(product)}
                  >
                    <Eye color="#D96262" size={18} />
                  </div>
                )}
                <div
                  className={styles.productActionDelete}
                  onClick={onClickDelete}
                >
                  <Trash2 color="white" size={18} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
