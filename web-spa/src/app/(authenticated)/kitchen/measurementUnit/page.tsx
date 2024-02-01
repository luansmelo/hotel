'use client'
import { ChangeEvent, useContext, useState } from 'react'
import InputSearch from '@/components/atoms/search'
import styles from './styles.module.scss'
import ConfirmDialog from '@/components/dialog'
import { Action } from '@/components/listItem/types'
import ListItem, { FieldDefinition } from '@/components/listItem/Index'
import { PencilRuler, Trash2 } from 'lucide-react'
import { TABLE_HEADER_GENERIC } from '@/constants/tableHeader'
import { MeasurementUnitContext } from '@/context/measurementUnit'
import MeasurementForm from '@/components/measurementUnit/MeasurementForm'
import Button from '@/components/button'
import { MeasurementProps } from '@/components/measurementUnit/MeasurementForm/types'
import MeasurementUnitEdit from '@/components/measurementUnit/MeasurementEdit'

export default function MeasurementUnit() {
  const {
    loading,
    measurementUnitList,
    handleMeasurementSave,
    handleDelete,
    handleEdit,
  } = useContext(MeasurementUnitContext)

  const [searchTerm, setSearchTerm] = useState('')

  const [createMeasurementModal, setCreateMeasurementUnit] = useState(false)
  const [selectedMeasurement, setSelectedMeasurement] =
    useState<MeasurementProps>({} as MeasurementProps)
  const [showEditModal, setShowEditModal] = useState(false)

  const [openDialog, setOpenDialog] = useState(false)

  const dynamicFields: FieldDefinition<MeasurementProps>[] = [
    { key: 'name', render: (item) => <span>{item.name!}</span> },
  ]

  const openEditModal = () => {
    setShowEditModal(true)
  }

  const openDeleteModal = () => {
    setOpenDialog(true)
  }

  const openCreateMeasurementUnit = () => {
    setCreateMeasurementUnit(true)
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSelectedMeasurementUnit = (input: MeasurementProps) => {
    setSelectedMeasurement(input)
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

  const actions: Action<MeasurementProps>[] = [
    {
      label: 'Editar',
      onClick: (item) => {
        handleSelectedMeasurementUnit(item)
        openEditModal()
      },
      icon: <PencilRuler color="#fff" size={20} />,
      actionClass: 'editar',
    },
    {
      label: 'Excluir',
      onClick: (item) => {
        openDeleteModal()
        handleSelectedMeasurementUnit(item)
      },
      icon: <Trash2 color="#fff" size={20} />,
      actionClass: 'excluir',
    },
  ]

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.searchAndButtonContainer}>
        <InputSearch
          search={'unidade de medida'}
          onChange={handleSearchChange}
          disabled={!openCreateMeasurementUnit}
        />

        <Button
          text="Cadastrar"
          height={50}
          width={380}
          loading={loading}
          disabled={!openCreateMeasurementUnit}
          onSubmit={openCreateMeasurementUnit}
        />
      </div>

      <ListItem
        loading={loading}
        itemList={filteredMeasurementUnit!}
        headers={TABLE_HEADER_GENERIC}
        actions={[]}
        dynamicFields={dynamicFields}
      />

      {createMeasurementModal && (
        <MeasurementForm
          loading={loading}
          isOpen={createMeasurementModal}
          handleCloseModal={() => setCreateMeasurementUnit(false)}
          handleSave={handleMeasurementSave}
        />
      )}

      {showEditModal && (
        <MeasurementUnitEdit
          loading={loading}
          group={selectedMeasurement}
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
            handleDelete(selectedMeasurement.id!)
            setOpenDialog(false)
          }}
        />
      )}
    </div>
  )
}
