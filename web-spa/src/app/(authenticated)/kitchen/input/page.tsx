'use client'
import { ChangeEvent, useContext, useState } from 'react'
import InputSearch from '@/components/atoms/search'
import InputList from '@/components/input/InputList'
import { Fade } from '@mui/material'
import styles from './styles.module.scss'
import { InputContext } from '@/context/input'
import InputCreate from '@/components/input/InputCreate'
import InputEdit from '@/components/input/InputEdit'
import { Input, InputListProps } from '@/components/input/types'
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

  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedInput, setSelectedInput] = useState<Input>({} as Input)
  const [showEditModal, setShowEditModal] = useState(false)

  const openEditModal = () => {
    setShowEditModal(true)
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSelectedInput = (input: Input) => {
    setSelectedInput(input)
  }

  const handleButtonClick = () => {
    setShowCreateForm(true)
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

        <button
          className={styles.button}
          onClick={handleButtonClick}
          disabled={loading}
        >
          CADASTRAR
        </button>
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
