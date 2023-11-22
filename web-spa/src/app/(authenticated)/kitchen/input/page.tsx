'use client'
import { ChangeEvent, useContext, useState } from 'react'
import { Ring } from 'react-cssfx-loading'
import InputSearch from '@/components/atoms/search'
import TableHeader from '@/components/atoms/TableHeader'
import InputList from '@/components/input/InputList'
import Image from '@/components/atoms/Image'
import { TABLE_HEADERS } from '@/constants/tableHeader'
import { Fade } from '@mui/material'
import styles from './styles.module.scss'
import { InputContext } from '@/context/input'
import InputCreate from '@/components/input/InputCreate'
import { InputProps } from '@/components/input/InputList/types'

const Input: React.FC<InputProps> = () => {
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

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
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

  if (loading) {
    return (
      <div className={styles.ringContainer}>
        <Ring color={'#04B2D9'} width="60px" height="60px" duration="1s" />
      </div>
    )
  }

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.searchAndButtonContainer}>
        <InputSearch
          search={'insumo'}
          onChange={handleSearchChange}
          disabled={showCreateForm}
        />

        <button className={styles.button} onClick={handleButtonClick}>
          CADASTRAR
        </button>
      </div>

      <TableHeader headers={TABLE_HEADERS} />

      <InputList
        inputList={filteredInputList}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />

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
