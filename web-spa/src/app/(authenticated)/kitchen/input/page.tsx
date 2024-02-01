'use client'
import { ChangeEvent, useCallback, useContext, useState } from 'react'
import InputSearch from '@/components/atoms/search'
import styles from './styles.module.scss'
import { InputContext } from '@/context/input'
import InputCreate from '@/components/input/InputCreate'
import InputEdit from '@/components/input/InputEdit'
import { Input } from '@/components/input/types'
import { MeasurementUnitContext } from '@/context/measurementUnit'
import { GroupContext } from '@/context/group'
import ConfirmDialog from '@/components/dialog'
import { MoreVertical, PencilRuler, Trash2 } from 'lucide-react'
import Button from '@/components/button'
import InputTable from '@/components/input/InputTable'
import { TableItem } from '@/components/table/types'
import { DropDown } from '@/components/dropDown'
const Input: React.FC = () => {
  const { loading, inputList, handleDelete, handleEdit, handleCreate } =
    useContext(InputContext)
  const { measurementUnitList } = useContext(MeasurementUnitContext)
  const { groupList } = useContext(GroupContext)

  const [searchTerm, setSearchTerm] = useState('')
  const [openModal, setOpenModal] = useState<'create' | 'edit' | null>(null)
  const [selectedInput, setSelectedInput] = useState<Input>({} as Input)

  const [openDialog, setOpenDialog] = useState(false)

  const [anchorEl, setDropdownAnchorEl] = useState<{
    [key: string]: HTMLElement | null
  }>({})

  const handleOpenDropdown = useCallback(
    (event: React.MouseEvent<HTMLElement>, inputId: string) => {
      setDropdownAnchorEl((prevAnchors) => ({
        ...prevAnchors,
        [inputId]: event.currentTarget,
      }))
    },
    []
  )

  const handleCloseDropdown = (inputId: string) => {
    setDropdownAnchorEl((prevAnchors) => ({
      ...prevAnchors,
      [inputId]: null,
    }))
  }

  const handleEditClick = (input: Input) => {
    setOpenModal('edit')
    setSelectedInput(input)
  }

  const handleDeleteClick = (input: Input) => {
    setSelectedInput(input)
    setOpenDialog(true)
  }

  const openCreateInput = () => {
    setOpenModal('create')
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredInputList = searchTerm
    ? inputList?.filter(
        (input) => input?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : inputList

  const hasResults = filteredInputList?.length > 0

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.searchAndButtonContainer}>
        <InputSearch
          search={'insumo'}
          onChange={handleSearchChange}
          disabled={Boolean(openModal)}
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
        <InputTable loading={loading} itemList={filteredInputList}>
          {(input: TableItem) => (
            <DropDown.Trigger
              key={input.id}
              icon={<MoreVertical color="#04B2D9" size={16} />}
              onClick={(e) => handleOpenDropdown(e, input.id)}
            >
              <DropDown.Menu
                anchorEl={anchorEl[input.id]}
                onClose={() => handleCloseDropdown(input.id)}
              >
                <DropDown.Actions>
                  <DropDown.Item
                    icon={<PencilRuler color="white" size={20} />}
                    label="editar"
                    onClick={() => {
                      handleEditClick(input as Input)
                      handleCloseDropdown(input.id)
                    }}
                  />
                  <DropDown.Item
                    icon={<Trash2 color="white" size={20} />}
                    label="remover"
                    onClick={() => {
                      handleDeleteClick(input as Input)
                      handleCloseDropdown(input.id)
                    }}
                  />
                </DropDown.Actions>
              </DropDown.Menu>
            </DropDown.Trigger>
          )}
        </InputTable>
      )}

      {openModal === 'edit' && (
        <InputEdit
          loading={loading}
          measurementUnitList={measurementUnitList}
          groupList={groupList}
          showModal={Boolean(openModal)}
          handleSave={handleEdit}
          handleCloseModal={() => setOpenModal(null)}
          input={selectedInput}
        />
      )}

      {openModal === 'create' && (
        <InputCreate
          loading={loading}
          inputList={inputList}
          measurementUnitList={measurementUnitList}
          groupList={groupList}
          handleSave={handleCreate}
          showModal={Boolean(openModal)}
          handleCloseModal={() => setOpenModal(null)}
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
    </div>
  )
}

export default Input
