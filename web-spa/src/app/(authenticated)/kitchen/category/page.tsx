'use client'
import { ChangeEvent, useContext, useState } from 'react'
import InputSearch from '@/components/search'
import styles from './styles.module.scss'
import { MoreVertical, PencilRuler, Trash2 } from 'lucide-react'
import Button from '@/components/button'
import { CategoryContext } from '@/context/category'
import { CategoryInput } from '@/utils/interfaces/category'
import CategoryForm from '@/components/category/CategoryCreate'
import CategoryTable from '@/components/category/CategoryTable'
import useDropdown from '@/hooks/useDropdown'
import { DropDown } from '@/components/dropDown'
import { TableItem } from '@/components/table/types'
import ConfirmDialog from '@/components/dialog'
import CategoryEditForm from '@/components/category/CategoryEdit'

export default function Category() {
  const {
    loading,
    categoryList,
    handleCreateCategory,
    handleUpdate,
    handleDelete,
  } = useContext(CategoryContext)

  const [searchTerm, setSearchTerm] = useState('')
  const [openModal, setOpenModal] = useState<'create' | 'edit' | null>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [dropdownState, dropdownActions] = useDropdown()

  const [selectedCategory, setSelectedGroup] = useState<CategoryInput>(
    {} as CategoryInput
  )

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleEditClick = (input: CategoryInput) => {
    setOpenModal('edit')
    setSelectedGroup(input)
  }

  const handleDeleteClick = (input: CategoryInput) => {
    setSelectedGroup(input)
    setOpenDialog(true)
  }

  const openCreateInput = () => {
    setOpenModal('create')
  }

  const filteredGroupList = searchTerm
    ? categoryList
        ?.filter(
          (input) =>
            input?.name?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        ?.map((category) => ({
          ...category,
          id: category.id || '',
        }))
    : (categoryList as CategoryInput[])

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.searchAndButtonContainer}>
        <InputSearch
          search={'grupo'}
          onChange={handleSearchChange}
          disabled={Boolean(openModal)}
        />

        <Button
          text="Cadastrar"
          height={50}
          width={380}
          loading={loading}
          disabled={Boolean(openModal)}
          onSubmit={openCreateInput}
        />
      </div>

      <CategoryTable itemList={filteredGroupList} loading={loading}>
        {(category: TableItem) => (
          <DropDown.Trigger
            key={category.id}
            icon={<MoreVertical color="#04B2D9" size={16} />}
            onClick={(e) => dropdownActions.handleOpenDropdown(e, category.id)}
          >
            <DropDown.Menu
              anchorEl={dropdownState[category.id]}
              onClose={() => dropdownActions.handleCloseDropdown(category.id)}
            >
              <DropDown.Actions>
                <DropDown.Item
                  icon={<PencilRuler color="white" size={20} />}
                  label="editar"
                  onClick={() => {
                    handleEditClick(category as CategoryInput)
                    dropdownActions.handleCloseDropdown(category.id)
                  }}
                />
                <DropDown.Item
                  icon={<Trash2 color="white" size={20} />}
                  label="remover"
                  onClick={() => {
                    handleDeleteClick(category as CategoryInput)
                    dropdownActions.handleCloseDropdown(category.id)
                  }}
                />
              </DropDown.Actions>
            </DropDown.Menu>
          </DropDown.Trigger>
        )}
      </CategoryTable>

      {openModal === 'create' && (
        <CategoryForm
          loading={loading}
          isOpenModel={Boolean(openModal)}
          closeModal={() => setOpenModal(null)}
          handleSave={handleCreateCategory}
        />
      )}

      {openModal === 'edit' && (
        <CategoryEditForm
          loading={loading}
          category={selectedCategory}
          closeModal={() => setOpenModal(null)}
          handleSave={handleUpdate}
          isOpenModel={Boolean(openModal)}
        />
      )}

      {openDialog && (
        <ConfirmDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onConfirm={() => {
            handleDelete(selectedCategory?.id)
            setOpenDialog(false)
          }}
        />
      )}
    </div>
  )
}