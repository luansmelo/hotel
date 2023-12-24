'use client'
import { IProductInputDataResponse, IProductResponse } from '@/atom/business'
import styles from './styles.module.scss'
import { Eye, SearchX, Trash2 } from 'lucide-react'
import { Hypnosis } from 'react-cssfx-loading'
import { useContext } from 'react'
import { MenuContext } from '@/context/menu'

interface ITableProductsProps {
  onClickView?: (product?: IProductInputDataResponse) => void
  onClickDelete?: (product: IProductResponse) => void
  removeEye?: boolean
}
export default function MenuProductTable({
  onClickDelete,
  onClickView,
  removeEye,
}: ITableProductsProps) {
  const { menuProductList, loading } = useContext(MenuContext)

  return (
    <>
      <table className={styles.table}>
        {loading ? (
          <div
            style={{
              width: '100%',
              height: '350px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Hypnosis color="#00A3E0" />
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
                {menuProductList.map(
                  (menu) =>
                    menu?.data?.map((item) => (
                      <tr className={styles.tr} key={item.products.name}>
                        <td>{item.products.name}</td>
                        <td>
                          {!removeEye && (
                            <div
                              className={styles.productActionView}
                              onClick={() => onClickView && onClickView(item)}
                            >
                              <Eye color="#D96262" size={18} />
                            </div>
                          )}
                          <div
                            className={styles.productActionDelete}
                            onClick={() =>
                              onClickDelete && onClickDelete(item.products)
                            }
                          >
                            <Trash2 color="white" size={18} />
                          </div>
                        </td>
                      </tr>
                    ))
                )}
              </>
            )}
          </tbody>
        )}
      </table>
    </>
  )
}
