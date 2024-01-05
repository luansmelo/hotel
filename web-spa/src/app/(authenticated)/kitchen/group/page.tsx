'use client'
import { ChangeEvent, useContext, useState } from 'react'
import InputSearch from '@/components/atoms/search'
import { Fade } from '@mui/material'
import styles from './styles.module.scss'
import { GroupContext } from '@/context/group'
import GroupForm from '@/components/group/GroupForm'
import ConfirmDialog from '@/components/dialog'
import { Action } from '@/components/listItem/types'
import ListItem, { FieldDefinition } from '@/components/listItem/Index'
import { PencilRuler, Trash2 } from 'lucide-react'
import { TABLE_HEADER_GENERIC } from '@/constants/tableHeader'
import { GroupProps } from '@/utils/interfaces/group'
import GroupEdit from '@/components/group/GroupEdit'

export default function Group() {
  const { loading, groupList, handleGroupSave, handleDelete, handleEdit } =
    useContext(GroupContext)

  const [searchTerm, setSearchTerm] = useState('')

  const [createGroupModal, setCreateGroupModal] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<GroupProps>(
    {} as GroupProps
  )
  const [showEditModal, setShowEditModal] = useState(false)

  const [openDialog, setOpenDialog] = useState(false)

  const dynamicFields: FieldDefinition<GroupProps>[] = [
    { key: 'name', render: (item) => <span>{item.name!}</span> },
  ]

  const openEditModal = () => {
    setShowEditModal(true)
  }

  const openDeleteModal = () => {
    setOpenDialog(true)
  }

  const openCreateGroup = () => {
    setCreateGroupModal(true)
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSelectedGroup = (input: GroupProps) => {
    setSelectedGroup(input)
  }

  const filteredGroupList = searchTerm
    ? groupList
        ?.filter(
          (input) =>
            input?.name?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        ?.map((group) => ({
          ...group,
          id: group.id || '',
        }))
    : groupList

  const hasResults = filteredGroupList?.length > 0

  const actions: Action<GroupProps>[] = [
    {
      label: 'Editar',
      onClick: (item) => {
        handleSelectedGroup(item)
        openEditModal()
      },
      icon: <PencilRuler color="#fff" size={20} />,
      actionClass: 'editar',
    },
    {
      label: 'Excluir',
      onClick: (item) => {
        openDeleteModal()
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
          disabled={!openCreateGroup}
        />

        <button className={styles.button} onClick={openCreateGroup}>
          +
        </button>
      </div>

      {hasResults && (
        <ListItem
          loading={loading}
          itemList={filteredGroupList!}
          headers={TABLE_HEADER_GENERIC}
          actions={actions}
          dynamicFields={dynamicFields}
        />
      )}

      {createGroupModal && (
        <GroupForm
          loading={loading}
          isOpen={createGroupModal}
          handleCloseModal={() => setCreateGroupModal(false)}
          handleSave={handleGroupSave}
        />
      )}

      {showEditModal && (
        <GroupEdit
          loading={loading}
          group={selectedGroup}
          isOpen={showEditModal}
          handleSave={handleEdit}
          handleCloseModal={() => setShowEditModal(false)}
        />
      )}

      {openDialog && (
        <ConfirmDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onConfirm={() => {
            handleDelete(selectedGroup.id!)
            setOpenDialog(false)
          }}
        />
      )}

      <div className={styles.textContainer}>
        <div>
          {!hasResults && !searchTerm && <p>Nenhum grupo cadastrado.</p>}
        </div>

        <div>
          {!hasResults && searchTerm && (
            <Fade in={!openCreateGroup} timeout={500}>
              <p>grupo não encontrado</p>
            </Fade>
          )}
        </div>
      </div>
    </div>
  )
}
