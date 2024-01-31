'use client'
import { ChangeEvent, useCallback, useContext, useState } from 'react'
import InputSearch from '@/components/atoms/search'
import styles from './styles.module.scss'
import { Action } from '@/components/listItem/types'
import ListItem, { FieldDefinition } from '@/components/listItem/Index'
import { PencilRuler, Trash2 } from 'lucide-react'
import { TABLE_HEADER_GENERIC } from '@/constants/tableHeader'
import Button from '@/components/button'
import { CategoryContext } from '@/context/category'
import { CategoryInput } from '@/utils/interfaces/category'
import CategoryForm from '@/components/category/CategoryCreate'
import DropDown from '@/components/dropDown'

export default function Category() {
  const { loading, categoryList, handleCreateCategory } =
    useContext(CategoryContext)

  const [searchTerm, setSearchTerm] = useState('')
  const [createGroupModal, setCreateGroupModal] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<CategoryInput>(
    {} as CategoryInput
  )

  const [dropdownAnchorEl, setDropdownAnchorEl] = useState<HTMLElement | null>(
    null
  )

  const handleOpenDropdown = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setDropdownAnchorEl(event.currentTarget)
    },
    []
  )

  const handleCloseDropdown = () => {
    setDropdownAnchorEl(null)
  }

  const dynamicFields: FieldDefinition<CategoryInput>[] = [
    { key: 'name', render: (item) => <span>{item.name!}</span> },
  ]

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSelectedGroup = (input: CategoryInput) => {
    setSelectedGroup(input)
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
    : categoryList

  const actions: Action<CategoryInput>[] = [
    {
      label: 'Editar',
      onClick: (item) => {
        handleSelectedGroup(item)
      },
      icon: <PencilRuler color="#fff" size={20} />,
      actionClass: 'editar',
    },
    {
      label: 'Excluir',
      onClick: (item) => {
        // openDeleteModal()
        handleSelectedGroup(item)
      },
      icon: <Trash2 color="#fff" size={20} />,
      actionClass: 'excluir',
    },
  ]

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.searchAndButtonContainer}>
        <InputSearch
          search={'grupo'}
          onChange={handleSearchChange}
          disabled={!createGroupModal}
        />

        <Button
          text="Cadastrar"
          height={50}
          width={380}
          loading={loading}
          disabled={!createGroupModal}
          onClick={true}
        />
      </div>

      <ListItem
        loading={loading}
        itemList={filteredGroupList! as CategoryInput[]}
        headers={TABLE_HEADER_GENERIC}
        actions={
          <>
            <button className={styles.button} onClick={handleOpenDropdown}>
              &#8230;
            </button>
            <DropDown
              actions={actions}
              onClose={handleCloseDropdown}
              anchorEl={dropdownAnchorEl}
            />
          </>
        }
        dynamicFields={dynamicFields}
      />

      {createGroupModal && (
        <CategoryForm
          loading={loading}
          isOpenModel={createGroupModal}
          closeModal={() => setCreateGroupModal(false)}
          handleSave={handleCreateCategory}
        />
      )}
    </div>
  )
}
