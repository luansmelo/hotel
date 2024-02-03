import { Trash } from 'lucide-react'
import { memo, useState } from 'react'
import { MenuCategoryProps } from '@/utils/interfaces/menu'
import { CategoryProps, RemoveProduct } from '@/utils/interfaces/category'
import { Menu } from '@/app/(authenticated)/kitchen/menu/map/page'
import { ProductProps } from '@/components/product/types'
import ConfirmDialog from '@/components/dialog'
import ProductTable from '@/components/product/ProductList'
import { TableItem } from '@/components/table/types'
import { DropDown } from '@/components/dropDown'
import useDropdown from '@/hooks/useDropdown'

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
  menuProductList,
  onClickDelete,
}: ITableProductsProps) {
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedInput, setSelectedInput] = useState<RemoveProduct | null>(null)
  const [dropdownState, dropdownActions] = useDropdown()
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

  return (
    <>
      <ProductTable
        itemList={
          (menuProductList?.category?.flatMap(
            (menu: CategoryProps) => (menu.schedule ?? []) as ProductProps[]
          ) ?? []) as ProductProps[]
        }
      >
        {(product: TableItem) => (
          <DropDown.Trigger
            key={product.id}
            icon={<Trash color="#04B2D9" size={16} />}
            onClick={(e) => dropdownActions.handleOpenDropdown(e, product.id)}
          >
            <DropDown.Menu
              anchorEl={dropdownState[product.id]}
              onClose={() => dropdownActions.handleCloseDropdown(product.id)}
            >
              <DropDown.Actions>
                <DropDown.Item
                  icon={<Trash color="white" size={20} />}
                  label="remover"
                  onClick={() => {
                    handleOpenDialog(product as ProductProps)
                    dropdownActions.handleCloseDropdown(product.id)
                  }}
                />
              </DropDown.Actions>
            </DropDown.Menu>
          </DropDown.Trigger>
        )}
      </ProductTable>

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
