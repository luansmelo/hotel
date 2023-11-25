'use client'
import { ChangeEvent, useContext, useState } from 'react'
import InputSearch from '@/components/atoms/search'
import TableHeader from '@/components/atoms/TableHeader'
import InputList from '@/components/input/InputList'
import Image from '@/components/atoms/Image'
import { TABLE_HEADERS } from '@/constants/tableHeader'
import { Fade } from '@mui/material'
import styles from './styles.module.scss'
import { InputContext } from '@/context/input'
import InputCreate from '@/components/input/InputCreate'
import { InputListProps, InputProps } from '@/components/input/InputList/types'
import InputEdit from '@/components/input/InputEdit'
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
  const [selectedInput, setSelectedInput] = useState<InputProps>(
    {} as InputProps
  )

  const [showEditModal, setShowEditModal] = useState(false)

  const openEditModal = () => {
    console.log('Abrindo o modal de edição')
    setShowEditModal(true)
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSelectedInput = (input: InputProps) => {
    setSelectedInput(input)
  }

  const handleButtonClick = () => {
    setShowCreateForm(true)
  }

  const filteredInputList = searchTerm
    ? inputList.filter(
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

      <TableHeader headers={TABLE_HEADERS} />

      <InputList
        loading={loading}
        inputList={filteredInputList}
        handleDelete={handleDelete}
        handleSelectInput={handleSelectedInput}
        openEditModal={openEditModal}
      />

      {showEditModal && (
        <InputEdit
          loading={loading}
          errors={errors}
          showModal={showEditModal}
          setErrors={setErrors}
          handleEdit={handleEdit}
          handleCloseModal={() => setShowEditModal(false)}
          input={selectedInput}
        />
      )}

      {showCreateForm && (
        <InputCreate
          loading={loading}
          errors={errors}
          setErrors={setErrors}
          handleCreate={handleCreate}
          showModal={showCreateForm}
          handleCloseModal={() => setShowCreateForm(false)}
        />
      )}

      {!hasResults && !searchTerm && (
        <Fade in={!showCreateForm} timeout={500}>
          <div className={styles.imageContainer}>Nenhum insumo cadastrado.</div>
        </Fade>
      )}

      {!hasResults && searchTerm && (
        <Fade in={!showCreateForm} timeout={750}>
          <div className={styles.imageContainer}>
            <Image
              src="/no-data.png"
              alt="Nenhum dado encontrado"
              height={266}
              width={407}
              key={1}
            />
          </div>
        </Fade>
      )}
    </div>
  )
}

export default Input
