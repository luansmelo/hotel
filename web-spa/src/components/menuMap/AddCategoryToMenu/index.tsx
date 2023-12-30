import Modal from '@/components/modal/Modal'
import { MenuMapProps } from '../types'
import { MenuToCategoryProps } from '@/utils/interfaces/menu'
import { memo, useState } from 'react'
import AutoComplete from '@/components/autoComplete'
import { CategoryProps } from '@/utils/interfaces/category'
import { Menu } from '@/app/(authenticated)/kitchen/menu/page'
import AddButton from '@/components/addButton'

function AddCategoryToMenu({
  isOpenModel,
  menuList,
  categoryList,
  closeModal,
  handleCategoryToMenu,
}: MenuMapProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryProps>(
    {} as CategoryProps
  )
  const [selectedMenu, setSelectedMenu] = useState<Menu>({} as Menu)
  const handleModalClose = () => {
    closeModal()
  }

  const addCategory = async (input: MenuToCategoryProps) => {
    try {
      if (handleCategoryToMenu) {
        await handleCategoryToMenu(input)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSelectedCategory({} as CategoryProps)
      setSelectedMenu({} as Menu)
      handleModalClose()
    }
  }

  const addSelectedMenu = (value: string) => {
    const selectedMenu = menuList?.find((menu) => menu.name === value)
    setSelectedMenu(selectedMenu as Menu)
  }

  const addSelectedCategory = (value: string) => {
    const selectedCategory = categoryList?.find(
      (category) => category.name === value
    )
    setSelectedCategory(selectedCategory as CategoryProps)
  }

  return (
    <Modal open={isOpenModel} onClose={closeModal}>
      <div>
        <div>
          <AutoComplete
            label="Menu"
            data={menuList!}
            addSelectedItem={addSelectedMenu}
          />
        </div>
        <div>
          <AutoComplete
            label="Categorias"
            data={categoryList!}
            addSelectedItem={addSelectedCategory}
          />
        </div>

        <div>
          <p>Lista de produtos:</p>
          <div>{selectedMenu?.category?.map((category) => category.name)}</div>
        </div>

        <AddButton
          text="Adicionar"
          onClickButton={() =>
            addCategory({
              menuId: selectedMenu.menuId,
              categoryId: selectedCategory.id!,
            })
          }
        />
      </div>
    </Modal>
  )
}

export default memo(AddCategoryToMenu)
