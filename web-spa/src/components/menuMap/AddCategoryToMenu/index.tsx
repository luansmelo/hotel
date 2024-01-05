import Modal from '@/components/modal/Modal'
import { MenuMapProps } from '../types'
import { memo, useCallback, useEffect, useState } from 'react'
import AutoComplete from '@/components/autoComplete'
import { CategoryProps } from '@/utils/interfaces/category'
import { Menu } from '@/app/(authenticated)/kitchen/menu/page'
import ListItem, { FieldDefinition } from '@/components/listItem/Index'
import { Action } from '@/components/listItem/types'
import { Trash2 } from 'lucide-react'

import { handleToastify } from '@/utils/toastify'
import styles from './styles.module.scss'
import ConfirmDialog from '@/components/dialog'
import AddButton from '@/components/button'
import { MenuToCategoryProps } from '@/utils/interfaces/menu'

export interface SelectedItem {
  id: string
  categoryId: string
  name: string
  categoryName: string
}

const AddCategoryToMenu = ({
  isOpenModel,
  menuList,
  categoryList,
  closeModal,
  setCurrentDateTab,
  handleCategoryToMenu,
}: MenuMapProps) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryProps>(
    {} as CategoryProps
  )
  const [selectedMenu, setSelectedMenu] = useState<Menu>({} as Menu)
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([])
  const [availableCategories, setAvailableCategories] = useState<
    CategoryProps[]
  >([])
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null)
  const [openDialog, setOpenDialog] = useState(false)

  const dynamicFields: FieldDefinition<SelectedItem>[] = [
    { key: 'name', render: (item) => <span>{item.name}</span> },

    { key: 'categoryName', render: (item) => <span>{item.categoryName}</span> },
  ]

  const clearFields = useCallback(() => {
    setSelectedCategory({} as CategoryProps)
    setSelectedMenu({} as Menu)
    setAvailableCategories([])
    setCurrentDateTab!(undefined)
  }, [
    setSelectedCategory,
    setSelectedMenu,
    setAvailableCategories,
    setCurrentDateTab,
  ])

  useEffect(() => {
    if (isOpenModel) {
      clearFields()
    }
  }, [clearFields, isOpenModel])

  const handleOpenDialog = (item: SelectedItem) => {
    setSelectedItem(item)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const normalizeData = (items: SelectedItem[]): MenuToCategoryProps[] =>
    items.map(({ id, categoryId }) => ({ menuId: id, categoryId }))

  const addCategory = async (input: MenuToCategoryProps[]) => {
    try {
      if (handleCategoryToMenu) {
        console.log(input)
        await handleCategoryToMenu(input)
      }
    } catch (error) {
      console.log(error)
    } finally {
      clearFields()
      closeModal()
    }
  }

  const addItemToList = () => {
    if (selectedMenu && selectedCategory) {
      const categoryExists = selectedItems.some(
        (item) => item.categoryId === selectedCategory.id
      )

      if (categoryExists) {
        handleToastify('Categoria já adicionada ao menu', 'warning')
        return
      }

      const newItem = {
        id: selectedMenu.menuId,
        categoryId: selectedCategory.id || '',
        name: selectedMenu.name,
        categoryName: selectedCategory.name,
      }

      setSelectedItems([...selectedItems, newItem])
      setSelectedMenu({} as Menu)
      setSelectedCategory({} as CategoryProps)
      handleToastify('Item adicionado ao menu', 'success')
    } else {
      handleToastify('Selecione um item', 'warning')
    }
  }

  const addSelectedMenu = (value: string) => {
    const selectedMenu = menuList?.find((menu) => menu.name === value)
    setSelectedMenu(selectedMenu as Menu)

    if (selectedMenu) {
      const menuCategoryIds =
        selectedMenu.category?.map((category: CategoryProps) => category.id) ||
        []
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

  const removeItem = (menuId: string, categoryId: string) => {
    const updatedItems = selectedItems.filter(
      (item) => item.id !== menuId || item.categoryId !== categoryId
    )
    setSelectedItems(updatedItems)
    handleToastify('Item excluído com sucesso!', 'success')
  }

  const actions: Action<SelectedItem>[] = [
    {
      actionClass: 'excluir',
      label: 'Excluir',
      icon: <Trash2 color="#FFF" size={20} />,
      onClick: handleOpenDialog,
    },
  ]

  return (
    <Modal open={isOpenModel} onClose={closeModal}>
      <div className={styles.containerWrapper}>
        <AutoComplete
          label="Menu"
          value={selectedMenu?.name}
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
          dynamicFields={dynamicFields}
          itemList={selectedItems}
        />
        <AddButton
          text="SALVAR"
          onClickButton={() => addCategory(normalizeData(selectedItems))}
          isButtonDisabled={!selectedItems.length}
        />
      </div>

      {openDialog && (
        <ConfirmDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onConfirm={() => {
            removeItem(selectedItem?.id || '', selectedItem?.categoryId || '')
            handleCloseDialog()
          }}
        />
      )}
    </Modal>
  )
}

export default memo(AddCategoryToMenu)
