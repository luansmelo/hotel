import { SearchX } from 'lucide-react'
import { Hypnosis } from 'react-cssfx-loading'
import styles from './styles.module.scss'
import { useContext, useEffect } from 'react'
import { MenuContext } from '@/context/menu'
import { IProductInputDataResponse } from '@/atom/business'
import { MenuCategoryProps } from '@/utils/interfaces/menu'
import { CategoryProps } from '@/utils/interfaces/category'
import { Menu } from '@/app/(authenticated)/kitchen/menu/page'
import { Product } from '@/components/product/types'
import Trash from '@/components/atoms/trash'

export interface Data {
  selectedMenu: Menu
  selectedCategory: CategoryProps
  currentDateTab: string
}

interface ITableProductsProps {
  data: Data
  fetchMenuProducts: (payload: MenuCategoryProps) => Promise<void>
  menuProductList?: Menu
  onClickView?: (product?: IProductInputDataResponse) => void
  onClickDelete?: (product: Product) => void
  removeEye?: boolean
}

export default function MenuProductTable({
  data,
  menuProductList,
  fetchMenuProducts,
  onClickDelete,
}: ITableProductsProps) {
  const { loading } = useContext(MenuContext)

  useEffect(() => {
    if (
      data.currentDateTab !== undefined &&
      data.selectedMenu &&
      data.selectedCategory
    ) {
      const payload = {
        menuId: data.selectedMenu.menuId || '',
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
              height: '300px',
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
                  height: '300px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <SearchX size={80} color="#D96262" />
              </div>
            ) : (
              <>
                {menuProductList?.category?.map((menu: CategoryProps) => {
                  const scheduleItems = menu.schedule || []

                  return scheduleItems.length === 0 ? (
                    <div
                      key={menu.id}
                      style={{
                        width: '100%',
                        height: '300px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <SearchX size={80} color="#F56D15" />
                    </div>
                  ) : (
                    scheduleItems.map((item) => (
                      <tr className={styles.tr} key={item.id}>
                        <td>{item.name}</td>
                        <td>
                          <Trash
                            onClick={() => onClickDelete && onClickDelete(item)}
                          />
                        </td>
                      </tr>
                    ))
                  )
                })}
              </>
            )}
          </tbody>
        )}
      </table>
    </>
  )
}
