'use client'
import { ChangeEvent, useCallback, useContext, useState } from 'react'
import InputSearch from '@/components/atoms/search'
import InputList from '@/components/input/InputList'
import { Fade } from '@mui/material'
import styles from './styles.module.scss'
import { InputContext } from '@/context/input'
import InputCreate from '@/components/input/InputCreate'
import InputEdit from '@/components/input/InputEdit'
import { Input, InputListProps } from '@/components/input/types'
import Dropdown from '@/components/dropDown'
import { Boxes, ChefHat, PencilRuler } from 'lucide-react'
import MeasurementUnitCreate from '@/components/input/MeasurementUnit'
import { MeasurementUnitContext } from '@/context/measurementUnit'
const Input: React.FC<InputListProps> = () => {
  const {
    loading,
    inputList,
    errors,
    setErrors,
    handleDelete,
    handleEdit,
    handleCreate,
  } = useContext(InputContext)
  const { handleMeasurementSave, measurementUnitList } = useContext(
    MeasurementUnitContext
  )

  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [createMesaurementModal, setCreateMeasurementModal] = useState(false)
  const [createGroupModal, setCreateGroupModal] = useState(false)
  const [selectedInput, setSelectedInput] = useState<Input>({} as Input)
  const [showEditModal, setShowEditModal] = useState(false)
  const [dropdownAnchorEl, setDropdownAnchorEl] = useState<null | HTMLElement>(
    null
  )
  console.log('LISTA I', measurementUnitList)
  const openEditModal = () => {
    setShowEditModal(true)
    setDropdownAnchorEl(null)
  }

  const openCreateInput = () => {
    setShowCreateForm(true)
    setDropdownAnchorEl(null)
  }

  const openCreateUnitMeasurement = () => {
    setCreateMeasurementModal(true)
    setDropdownAnchorEl(null)
  }

  const openCreateGroup = () => {
    setCreateGroupModal(true)
    setDropdownAnchorEl(null)
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSelectedInput = (input: Input) => {
    setSelectedInput(input)
    setDropdownAnchorEl(null)
  }

  const handleOpenDropdown = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setDropdownAnchorEl(event.currentTarget)
    },
    []
  )

  const handleCloseDropdown = () => {
    setDropdownAnchorEl(null)
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
          disabled={showCreateForm}
        />

        <button className={styles.button} onClick={handleOpenDropdown}>
          +
        </button>

        <Dropdown
          actions={[
            {
              label: 'Cadastrar Insumo',
              onClick: openCreateInput,
              icon: <ChefHat />,
            },
            {
              label: 'Cadastrar Unidade de Medida',
              onClick: openCreateUnitMeasurement,
              icon: <PencilRuler />,
            },
            {
              label: 'Cadastrar Grupo',
              onClick: openCreateGroup,
              icon: <Boxes />,
            },
          ]}
          onClose={handleCloseDropdown}
          anchorEl={dropdownAnchorEl}
        />
      </div>

      {hasResults && (
        <InputList
          loading={loading}
          inputList={filteredInputList}
          handleDelete={handleDelete}
          handleSelectInput={handleSelectedInput}
          openEditModal={openEditModal}
        />
      )}

      {createMesaurementModal && (
        <MeasurementUnitCreate
          isOpen={createMesaurementModal}
          handleCloseModal={() => setCreateMeasurementModal(false)}
          handleSave={handleMeasurementSave}
          setErrors={setErrors}
          loading={loading}
          errors={errors}
        />
      )}

      {showEditModal && (
        <InputEdit
          loading={loading}
          errors={errors}
          showModal={showEditModal}
          setErrors={setErrors}
          handleSave={handleEdit}
          handleCloseModal={() => setShowEditModal(false)}
          input={selectedInput}
        />
      )}

      {showCreateForm && (
        <InputCreate
          loading={loading}
          errors={errors}
          inputList={inputList}
          measurementUnitList={measurementUnitList}
          setErrors={setErrors}
          handleSave={handleCreate}
          showModal={showCreateForm}
          handleCloseModal={() => setShowCreateForm(false)}
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
