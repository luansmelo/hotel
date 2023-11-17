import { IProductResponse } from '@/atom/business'
import { Eye, Trash2 } from 'lucide-react'
import styles from './styles.module.scss'
import { Fade } from '@mui/material'

interface ITableProductsProps {
  productData: IProductResponse[]
  onClickView?: (productId?: string) => void
  onClickDelete?: (productId: string) => void
}
export default function ProductListTable({
  productData,
  onClickDelete,
  onClickView,
}: ITableProductsProps) {
  return (
    <Fade in={true} timeout={750}>
      <div className={styles.productListMainView}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr
              style={{
                color: '#000',
              }}
            >
              <td style={{ color: '#000' }}>Nome</td>
              <td style={{ color: '#000' }}>Descrição</td>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {productData.map((product) => {
              return (
                <tr className={styles.tr} key={product.name}>
                  <td>{product.name}</td>
                  <td>{product.productDescription}</td>
                  <td>
                    <div
                      className={styles.productActionView}
                      onClick={() => onClickView && onClickView(product.id)}
                    >
                      <Eye color="#D96262" size={18} />
                    </div>
                    <div
                      className={styles.productActionDelete}
                      onClick={() =>
                        onClickDelete && product.id && onClickDelete(product.id)
                      }
                    >
                      <Trash2 color="white" size={18} />
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Fade>
  )
}
