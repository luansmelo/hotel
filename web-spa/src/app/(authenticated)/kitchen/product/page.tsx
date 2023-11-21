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

export default function Product() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { loading, inputList } = useContext(InputContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (showCreateForm) {
      setShowCreateForm(false)
      setAnchorEl(null)
    } else {
      setAnchorEl(event.currentTarget)
      setMenuOpen(!menuOpen)
    }
  }

  const handleCloseDropdown = () => {
    setAnchorEl(null)
    setShowCreateForm(false)
  }

  const handleDropdownAction = (action: string) => {
    handleCloseDropdown()
    if (action === 'Criar insumo') {
      setShowCreateForm(true)
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
    <Fade in={true} timeout={500}>
      <div className={styles.inputWrapper}>
        <div className={styles.inputWrapper}>
          <div className={styles.searchAndButtonContainer}>
            {showCreateForm ? (
              <div className={styles.placeholder}></div>
            ) : (
              <InputSearch
                search={'insumo'}
                onChange={handleSearchChange}
                disabled={showCreateForm}
              />
            )}
            <button className={styles.button} onClick={handleButtonClick}>
              {showCreateForm ? '←' : '+'}
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
            ]}
          />
        </div>
        <TableHeader headers={TABLE_HEADERS} />

        {showCreateForm ? (
          <InputCreate handleCancelNewInput={() => setShowCreateForm(false)} />
        ) : (
          <>
            {!hasResults && !searchTerm && (
              <div className={styles.imageContainer}>
                Nenhum insumo cadastrado.
              </div>
            )}

            {!hasResults && searchTerm && (
              <Fade in={true} timeout={750}>
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

            {hasResults && <InputList inputList={filteredInputList} />}
          </>
        )}
      </div>
    </Fade>
  )
}