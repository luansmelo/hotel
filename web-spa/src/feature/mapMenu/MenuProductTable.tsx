'use client'
import { IProductInputDataResponse, IProductResponse } from '@/atom/business'
import styles from './styles.module.scss'
import { Eye, SearchX, Trash2 } from 'lucide-react'
import { useMapContext } from '@/context/MapaContext'
import { Hypnosis } from 'react-cssfx-loading'

interface ITableProductsProps {
  onClickView?: (product?: IProductInputDataResponse) => void
  onClickDelete?: (product: IProductResponse) => void
  headColor?: string
  removeEye?: boolean
}
export default function MenuProductTable({
  headColor,
  onClickDelete,
  onClickView,
  removeEye,
}: ITableProductsProps) {
  const { menuProductList, isLoading } = useMapContext()

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

        {isLoading ? (
          <div
            style={{
              width: '100%',
              height: '260px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Hypnosis color="#F28482" />
          </div>
        ) : (
          <tbody className={styles.tbody}>
            {menuProductList.length === 0 ? (
              <div
                style={{
                  width: '100%',
                  height: '260px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <SearchX size={80} color="#D96262" />
              </div>
            ) : (
              <>
                {menuProductList.map((product) => (
                  <tr className={styles.tr} key={product.product.name}>
                    <td>{product.product.name}</td>
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
                        onClick={() =>
                          onClickDelete && onClickDelete(product.product)
                        }
                      >
                        <Trash2 color="white" size={18} />
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        )}
      </table>
    </>
  )
}
