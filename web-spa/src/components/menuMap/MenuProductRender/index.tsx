import { Trash2 } from 'lucide-react'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import { MenuCategoryProps } from '@/utils/interfaces/menu'
import { CategoryProps, RemoveProduct } from '@/utils/interfaces/category'
import { Menu } from '@/app/(authenticated)/kitchen/menu/page'
import { ProductProps } from '@/components/product/types'
import ListItem from '@/components/listItem/Index'
import { Action } from '@/components/listItem/types'
import ConfirmDialog from '@/components/dialog'

export interface Data {
  selectedMenu: Menu
  selectedCategory: CategoryProps
  currentDateTab: string
}

interface ITableProductsProps {
  loading: boolean
  data: Data
  fetchMenuProducts: (payload: MenuCategoryProps) => Promise<void>
  menuProductList?: Menu
  onClickDelete: (id: RemoveProduct) => void
}

export default function MenuProductTable({
  data,
  loading,
  menuProductList,
  fetchMenuProducts,
  onClickDelete,
}: ITableProductsProps) {
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedInput, setSelectedInput] = useState<RemoveProduct | null>(null)

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

  const handleOpenDialog = (item: ProductProps) => {
    setSelectedInput({
      menuId: data.selectedMenu.menuId,
      categoryId: data.selectedCategory.id!,
      productId: item.id,
      weekDay: data.currentDateTab!,
    })
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const actions: Action<ProductProps>[] = [
    {
      actionClass: 'excluir',
      label: 'Excluir',
      icon: <Trash2 color="#fff" />,
      onClick: (item) => {
        handleOpenDialog(item)
      },
    },
  ]

  return (
    <>
      <table className={styles.table}>
        <tbody className={styles.tbody}>
          <>
            {menuProductList?.category?.map((menu: CategoryProps) => {
              return (
                <ListItem
                  key={menu.id}
                  loading={loading}
                  actions={actions}
                  dynamicFields={['name']}
                  headers={['name']}
                  itemList={menu.schedule as ProductProps[]}
                />
              )
            })}
          </>
        </tbody>

        {openDialog && (
          <ConfirmDialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            onConfirm={() => {
              if (selectedInput) {
                onClickDelete(selectedInput)
                handleCloseDialog()
                setSelectedInput(null)
                fetchMenuProducts({
                  menuId: data.selectedMenu.menuId,
                  categoryId: data.selectedCategory.id!,
                  weekDay: data.currentDateTab!,
                })
              }
            }}
          />
        )}
      </table>
    </>
  )
}
