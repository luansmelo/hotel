import Modal from '@/components/modal/Modal'
import { MenuMapProps } from '../types'
import { memo, useEffect, useState } from 'react'
import AutoComplete from '@/components/autoComplete'
import { CategoryProps } from '@/utils/interfaces/category'
import { Menu } from '@/app/(authenticated)/kitchen/menu/page'
import ListItem from '@/components/listItem/Index'
import { Action } from '@/components/listItem/types'
import { Trash2 } from 'lucide-react'

import { handleToastify } from '@/utils/toastify'
import styles from './styles.module.scss'

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
  const [selectedItems, setSelectedItems] = useState([])
  const [availableCategories, setAvailableCategories] = useState<
    CategoryProps[]
  >([])

  useEffect(() => {
    if (isOpenModel) {
      clearFields()
    }
  }, [isOpenModel])

  const handleModalClose = () => {
    closeModal()
  }

  const clearFields = () => {
    setSelectedCategory({} as CategoryProps)
    setSelectedMenu({} as Menu)
    setAvailableCategories([])
  }

  const addCategory = async () => {
    try {
      if (handleCategoryToMenu) {
        await handleCategoryToMenu(input)
      }
    } catch (error) {
      console.log(error)
    } finally {
      clearFields()
      handleModalClose()
    }
  }

  const addItemToList = () => {
    // Lógica para adicionar à lista
    if (selectedMenu && selectedCategory) {
      // Verifique se a categoria já está na lista
      const categoryExists = selectedItems.some(
        (item) => item.categoryId === selectedCategory.id
      )

      if (categoryExists) {
        handleToastify('Categoria já adicionada ao menu', 'warning')
        return
      }

      const newItem = {
        menuId: selectedMenu.menuId,
        categoryId: selectedCategory.id,
        name: selectedMenu.name,
        categoryName: selectedCategory.name,
      }

      setSelectedItems([...selectedItems, newItem])
      setSelectedCategory({} as CategoryProps)
    } else {
      handleToastify('Selecione um item', 'warning')
    }
  }

  const addSelectedMenu = (value: string) => {
    const selectedMenu = menuList?.find((menu) => menu.name === value)
    setSelectedMenu(selectedMenu as Menu)

    if (selectedMenu) {
      const menuCategoryIds =
        selectedMenu.category?.map((category) => category.id) || []
      const menuCategories =
        categoryList?.filter(
          (category) =>
            !menuCategoryIds.includes(category.id) &&
            !selectedItems.some((item) => item.categoryId === category.id)
        ) || []

      setAvailableCategories(menuCategories)
    }
  }

  const addSelectedCategory = (value: string) => {
    const selectedCategory = categoryList?.find(
      (category) => category.name === value
    )
    setSelectedCategory(selectedCategory as CategoryProps)
  }

  const actions: Action<Menu>[] = [
    {
      actionClass: 'excluir',
      label: 'Excluir',
      icon: <Trash2 color="#FFF" size={20} />,
      onClick: (item) => {},
    },
  ]

  return (
    <Modal open={isOpenModel} onClose={closeModal}>
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          <AutoComplete
            label="Menu"
            data={menuList}
            addSelectedItem={addSelectedMenu}
          />

          <AutoComplete
            disabled={!selectedMenu?.menuId}
            label="Categorias"
            data={availableCategories!}
            addSelectedItem={addSelectedCategory}
          />

          <button
            className={styles.button}
            onClick={addItemToList}
            disabled={!selectedMenu?.menuId || !selectedCategory?.id}
          >
            Adicionar à Lista
          </button>

          <ListItem
            height={300}
            loading={false}
            actions={actions}
            headers={['Menu', 'Categoria']}
            dynamicFields={['name', 'categoryName']}
            itemList={selectedItems}
          />
        </div>
      </div>
    </Modal>
  )
}

export default memo(AddCategoryToMenu)
