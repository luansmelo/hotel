import { Trash2 } from 'lucide-react'
import { memo, useState } from 'react'
import { MenuCategoryProps } from '@/utils/interfaces/menu'
import { CategoryProps, RemoveProduct } from '@/utils/interfaces/category'
import { Menu } from '@/app/(authenticated)/kitchen/menu/map/page'
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
  menuProductList?: MenuCategoryProps
  onClickDelete: (id: RemoveProduct) => void
}

function MenuProductTable({
  data,
  loading,
  menuProductList,
  onClickDelete,
}: ITableProductsProps) {
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedInput, setSelectedInput] = useState<RemoveProduct | null>(null)

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
      <ListItem
        loading={loading}
        actions={actions}
        dynamicFields={[
          {
            key: 'name',
            render: (item) => <span>{item.name}</span>,
          },
        ]}
        headers={['name']}
        itemList={
          (menuProductList?.category?.flatMap(
            (menu: CategoryProps) => (menu.schedule ?? []) as ProductProps[]
          ) ?? []) as ProductProps[]
        }
      />

      {openDialog && (
        <ConfirmDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onConfirm={() => {
            onClickDelete(selectedInput!)
            setSelectedInput(null)
            handleCloseDialog()
          }}
        />
      )}
    </>
  )
}

export default memo(MenuProductTable)
