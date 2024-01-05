'use client'
import { ChangeEvent, useContext, useState } from 'react'
import InputSearch from '@/components/atoms/search'
import { Fade } from '@mui/material'
import styles from './styles.module.scss'
import { InputContext } from '@/context/input'
import InputCreate from '@/components/input/InputCreate'
import InputEdit from '@/components/input/InputEdit'
import { Input } from '@/components/input/types'
import { MeasurementUnitContext } from '@/context/measurementUnit'
import { GroupContext } from '@/context/group'
import ConfirmDialog from '@/components/dialog'
import { Action } from '@/components/listItem/types'
import ListItem, { FieldDefinition } from '@/components/listItem/Index'
import { PencilRuler, Trash2 } from 'lucide-react'
import { TABLE_HEADERS_INPUT } from '@/constants/tableHeader'
import Button from '@/components/button'
const Input: React.FC = () => {
  const { loading, inputList, handleDelete, handleEdit, handleCreate } =
    useContext(InputContext)
  const { measurementUnitList } = useContext(MeasurementUnitContext)
  const { groupList } = useContext(GroupContext)

  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedInput, setSelectedInput] = useState<Input>({} as Input)
  const [showEditModal, setShowEditModal] = useState(false)

  const [openDialog, setOpenDialog] = useState(false)

  const dynamicFields: FieldDefinition<Input>[] = [
    { key: 'name', render: (item) => <span>{item.name}</span> },
    { key: 'unitPrice', render: (item) => <span>{item.unitPrice}</span> },
    {
      key: 'measurementUnit',
      render: (item) => <span>{item.measurementUnit}</span>,
    },
    { key: 'code', render: (item) => <span>{item.code}</span> },
    { key: 'group', render: (item) => <span>{item.group}</span> },
  ]

  const openEditModal = () => {
    setShowEditModal(true)
  }

  const openDeleteModal = () => {
    setOpenDialog(true)
  }

  const openCreateInput = () => {
    setShowCreateForm(true)
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSelectedInput = (input: Input) => {
    setSelectedInput(input)
  }

  const filteredInputList = searchTerm
    ? inputList?.filter(
        (input) => input?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : inputList

  const hasResults = filteredInputList?.length > 0

  const actions: Action<Input>[] = [
    {
      label: 'Editar',
      onClick: (item) => {
        setSelectedInput(item)
        openEditModal()
      },
      icon: <PencilRuler color="#fff" size={20} />,
      actionClass: 'editar',
    },
    {
      label: 'Excluir',
      onClick: (item) => {
        openDeleteModal()
        handleSelectedInput(item)
      },
      icon: <Trash2 color="#fff" size={20} />,
      actionClass: 'excluir',
    },
  ]

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.searchAndButtonContainer}>
        <InputSearch
          search={'insumo'}
          onChange={handleSearchChange}
          disabled={showCreateForm}
        />

        <Button
          text="Cadastrar"
          height={50}
          width={380}
          loading={loading}
          disabled={!openCreateInput}
          onSubmit={openCreateInput}
        />
      </div>

      {hasResults && (
        <ListItem
          loading={loading}
          itemList={filteredInputList}
          headers={TABLE_HEADERS_INPUT}
          actions={actions}
          dynamicFields={dynamicFields}
        />
      )}

      {showEditModal && (
        <InputEdit
          loading={loading}
          measurementUnitList={measurementUnitList}
          groupList={groupList}
          showModal={showEditModal}
          handleSave={handleEdit}
          handleCloseModal={() => setShowEditModal(false)}
          input={selectedInput}
        />
      )}

      {showCreateForm && (
        <InputCreate
          loading={loading}
          inputList={inputList}
          measurementUnitList={measurementUnitList}
          groupList={groupList}
          handleSave={handleCreate}
          showModal={showCreateForm}
          handleCloseModal={() => setShowCreateForm(false)}
        />
      )}

      {openDialog && (
        <ConfirmDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onConfirm={() => {
            handleDelete(selectedInput?.id)
            setOpenDialog(false)
          }}
        />
      )}

      <div className={styles.textContainer}>
        <div>
          {!hasResults && !searchTerm && <p>Nenhum insumo cadastrado.</p>}
        </div>

        <div>
          {!hasResults && searchTerm && (
            <Fade in={!showCreateForm} timeout={500}>
              <p>Insumo não encontrado</p>
            </Fade>
          )}
        </div>
      </div>
    </div>
  )
}

export default Input
