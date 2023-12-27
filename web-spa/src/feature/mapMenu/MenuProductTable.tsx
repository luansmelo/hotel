import { Eye, SearchX, Trash2 } from 'lucide-react'
import { Hypnosis } from 'react-cssfx-loading'
import styles from './styles.module.scss'
import { useContext } from 'react'
import { MenuContext } from '@/context/menu'
import { IProductInputDataResponse } from '@/atom/business'

interface ITableProductsProps {
  onClickView?: (product?: IProductInputDataResponse) => void
  onClickDelete?: (product: any) => void
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
            {menuProductList?.category?.length === 0 ? (
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
                {menuProductList?.category?.map(
                  (menu) =>
                    menu?.schedule?.map((item) => (
                      <tr className={styles.tr} key={item.id}>
                        <td>{item.name}</td>
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
                            onClick={() => onClickDelete && onClickDelete(item)}
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
