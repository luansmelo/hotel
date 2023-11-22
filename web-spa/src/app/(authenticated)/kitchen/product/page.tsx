'use client'
import React, { ChangeEvent, useContext, useState } from 'react'
import { Ring } from 'react-cssfx-loading'
import InputSearch from '@/components/atoms/search'
import TableHeader from '@/components/atoms/TableHeader'
import InputList from '@/components/input/InputList'
import Image from '@/components/atoms/Image'
import { TABLE_HEADERS } from '@/constants/tableHeader'
import { Fade } from '@mui/material'
import styles from './styles.module.scss'
import Dropdown from '@/components/dropDown'
import { InputContext } from '@/context/input'
import InputCreate from '@/components/input/InputCreate'
import { handleToastify } from '@/utils/toastify'

export default function Product() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { loading, inputList, handleDelete } = useContext(InputContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    setMenuOpen(!menuOpen)
  }

  const handleCloseDropdown = () => {
    setAnchorEl(null)
    setShowCreateForm(false)
  }

  const handleDropdownAction = (action: string) => {
    handleCloseDropdown()
    if (action === 'Criar insumo') {
      setShowCreateForm(true)
    } else {
      handleToastify('Opção indisponível.', 'error')
    }
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
        <Ring color={'#84A59D'} width="60px" height="60px" duration="1s" />
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
          +
        </button>
      </div>

      <Dropdown
        anchorEl={anchorEl}
        onClose={handleCloseDropdown}
        actions={[
          {
            label: 'Criar insumo',
            onClick: () => handleDropdownAction('Criar insumo'),
          },
          {
            label: 'Upload arquivo de insumo',
            onClick: () => handleDropdownAction('upload arquivo de insumo'),
          },
        ]}
      />

      <TableHeader headers={TABLE_HEADERS} />
      <div>
        <InputList inputList={filteredInputList} handleDelete={handleDelete} />
      </div>

      {showCreateForm && (
        <InputCreate
          handleCancelNewInput={() => setShowCreateForm(false)}
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
