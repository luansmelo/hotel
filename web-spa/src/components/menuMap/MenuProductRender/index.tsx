import { Eye, SearchX, Trash2 } from 'lucide-react'
import { Hypnosis } from 'react-cssfx-loading'
import styles from './styles.module.scss'
import { useContext, useEffect } from 'react'
import { MenuContext } from '@/context/menu'
import { IProductInputDataResponse } from '@/atom/business'
import { MenuCategoryProps } from '@/utils/interfaces/menu'
import { CategoryProps } from '@/utils/interfaces/category'
import { Menu } from '@/app/(authenticated)/kitchen/menu/page'
import { Product } from '@/components/product/types'

export interface Data {
  selectedMenu: Menu
  selectedCategory: CategoryProps
  currentDateTab: string
}

interface ITableProductsProps {
  data: Data
  fetchMenuProducts: (payload: MenuCategoryProps) => Promise<void>
  menuProductList?: any
  onClickView?: (product?: IProductInputDataResponse) => void
  onClickDelete?: (product: Product) => void
  removeEye?: boolean
}

export default function MenuProductTable({
  data,
  menuProductList,
  removeEye,
  fetchMenuProducts,
  onClickDelete,
  onClickView,
}: ITableProductsProps) {
  const { loading } = useContext(MenuContext)

  useEffect(() => {
    if (
      data.currentDateTab !== undefined &&
      data.selectedMenu &&
      data.selectedCategory
    ) {
      const payload = {
        menuId: data.selectedMenu.menuId,
        categoryId: data.selectedCategory.id || '',
        weekDay: data.currentDateTab || '',
      }

      fetchMenuProducts(payload)
    }
  }, [
    fetchMenuProducts,
    data.currentDateTab,
    data.selectedCategory,
    data.selectedMenu,
  ])

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
                  (menu: CategoryProps) =>
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
