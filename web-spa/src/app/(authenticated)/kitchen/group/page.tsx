'use client'
import { ChangeEvent, useContext, useState } from 'react'
import InputSearch from '@/components/atoms/search'
import styles from './styles.module.scss'
import { GroupContext } from '@/context/group'
import GroupForm from '@/components/group/GroupForm'
import ConfirmDialog from '@/components/dialog'
import { MoreVertical, PencilRuler, Trash2 } from 'lucide-react'
import { GroupProps } from '@/utils/interfaces/group'
import GroupEdit from '@/components/group/GroupEdit'
import Button from '@/components/button'
import GroupTable from '@/components/group/CategoryTable'
import { DropDown } from '@/components/dropDown'
import { TableItem } from '@/components/table/types'
import useDropdown from '@/hooks/useDropdown'

export default function Group() {
  const { loading, groupList, handleGroupSave, handleDelete, handleEdit } =
    useContext(GroupContext)

  const [searchTerm, setSearchTerm] = useState('')

  const [selectedGroup, setSelectedGroup] = useState<GroupProps>(
    {} as GroupProps
  )
  const [openModal, setOpenModal] = useState<'create' | 'edit' | null>(null)

  const [openDialog, setOpenDialog] = useState(false)
  const [dropdownState, dropdownActions] = useDropdown()

  const handleEditClick = (input: GroupProps) => {
    setOpenModal('edit')
    setSelectedGroup(input)
  }

  const handleDeleteClick = (input: GroupProps) => {
    setSelectedGroup(input)
    setOpenDialog(true)
  }

  const handleCreateClick = () => {
    setOpenModal('create')
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
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
          onSubmit={handleCreateClick}
        />
      </div>

      <GroupTable itemList={filteredGroupList} loading={loading}>
        {(group: TableItem) => (
          <DropDown.Trigger
            key={group.id}
            icon={<MoreVertical color="#04B2D9" size={16} />}
            onClick={(e) => dropdownActions.handleOpenDropdown(e, group.id)}
          >
            <DropDown.Menu
              anchorEl={dropdownState[group.id]}
              onClose={() => dropdownActions.handleCloseDropdown(group.id)}
            >
              <DropDown.Actions>
                <DropDown.Item
                  icon={<PencilRuler color="white" size={20} />}
                  label="editar"
                  onClick={() => {
                    handleEditClick(group as GroupProps)
                    dropdownActions.handleCloseDropdown(group.id)
                  }}
                />
                <DropDown.Item
                  icon={<Trash2 color="white" size={20} />}
                  label="remover"
                  onClick={() => {
                    handleDeleteClick(group as GroupProps)
                    dropdownActions.handleCloseDropdown(group.id)
                  }}
                />
              </DropDown.Actions>
            </DropDown.Menu>
          </DropDown.Trigger>
        )}
      </GroupTable>

      {openModal === 'create' && (
        <GroupForm
          loading={loading}
          isOpen={Boolean(openModal)}
          handleCloseModal={() => setOpenModal(null)}
          handleSave={handleGroupSave}
        />
      )}

      {openModal === 'edit' && (
        <GroupEdit
          loading={loading}
          group={selectedGroup}
          isOpen={Boolean(openModal)}
          handleSave={handleEdit}
          handleCloseModal={() => setOpenModal(null)}
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
    </div>
  )
}
