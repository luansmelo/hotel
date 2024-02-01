'use client'
import { ChangeEvent, useContext, useState } from 'react'
import InputSearch from '@/components/atoms/search'
import styles from './styles.module.scss'
import ConfirmDialog from '@/components/dialog'
import { MoreVertical, PencilRuler, Trash2 } from 'lucide-react'
import { MeasurementUnitContext } from '@/context/measurementUnit'
import MeasurementForm from '@/components/measurementUnit/MeasurementForm'
import Button from '@/components/button'
import { MeasurementProps } from '@/components/measurementUnit/MeasurementForm/types'
import MeasurementUnitEdit from '@/components/measurementUnit/MeasurementEdit'
import MeasurementTable from '@/components/measurementUnit/MeasurementTable'
import { DropDown } from '@/components/dropDown'
import { TableItem } from '@/components/table/types'
import useDropdown from '@/hooks/useDropdown'

export default function MeasurementUnit() {
  const {
    loading,
    measurementUnitList,
    handleMeasurementSave,
    handleDelete,
    handleEdit,
  } = useContext(MeasurementUnitContext)

  const [searchTerm, setSearchTerm] = useState('')

  const [selectedMeasurement, setSelectedMeasurement] =
    useState<MeasurementProps>({} as MeasurementProps)
  const [openDialog, setOpenDialog] = useState(false)
  const [openModal, setOpenModal] = useState<'create' | 'edit' | null>(null)
  const [dropdownState, dropdownActions] = useDropdown()

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleEditClick = (input: MeasurementProps) => {
    setOpenModal('edit')
    setSelectedMeasurement(input)
  }

  const handleDeleteClick = (input: MeasurementProps) => {
    setSelectedMeasurement(input)
    setOpenDialog(true)
  }

  const handleCreateClick = () => {
    setOpenModal('create')
  }

  const filteredMeasurementUnit = searchTerm
    ? measurementUnitList
        ?.filter(
          (input) =>
            input?.name?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        ?.map((measurementUnit) => ({
          ...measurementUnit,
          id: measurementUnit.id || '',
        }))
    : measurementUnitList

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.searchAndButtonContainer}>
        <InputSearch
          search={'unidade de medida'}
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

      <MeasurementTable itemList={filteredMeasurementUnit} loading={loading}>
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
                    handleEditClick(group as MeasurementProps)
                    dropdownActions.handleCloseDropdown(group.id)
                  }}
                />
                <DropDown.Item
                  icon={<Trash2 color="white" size={20} />}
                  label="remover"
                  onClick={() => {
                    handleDeleteClick(group as MeasurementProps)
                    dropdownActions.handleCloseDropdown(group.id)
                  }}
                />
              </DropDown.Actions>
            </DropDown.Menu>
          </DropDown.Trigger>
        )}
      </MeasurementTable>

      {openModal === 'create' && (
        <MeasurementForm
          loading={loading}
          isOpen={Boolean(openModal)}
          handleCloseModal={() => setOpenModal(null)}
          handleSave={handleMeasurementSave}
        />
      )}

      {openModal === 'edit' && (
        <MeasurementUnitEdit
          loading={loading}
          group={selectedMeasurement}
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
            handleDelete(selectedMeasurement.id!)
            setOpenDialog(false)
          }}
        />
      )}
    </div>
  )
}
