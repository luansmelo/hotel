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

export default function Input() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { loading, inputList } = useContext(InputContext)
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseDropdown = () => {
    setAnchorEl(null)
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
        <div className={styles.inputContainer}>
          <InputSearch search={'insumo'} onChange={handleSearchChange} />
          <button className={styles.button} onClick={handleButtonClick}>
            +
          </button>

          <Dropdown
            anchorEl={anchorEl}
            onClose={handleCloseDropdown}
            actions={[
              {
                label: 'Criar insumo',
                onClick: () => {
                  handleCloseDropdown()
                },
              },
              {
                label: 'Listar insumos',
                onClick: () => {
                  handleCloseDropdown()
                },
              },
            ]}
          />
        </div>

        <TableHeader headers={TABLE_HEADERS} />

        {!hasResults && !searchTerm && (
          <div className={styles.imageContainer}>Nenhum insumo cadastrado.</div>
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
      </div>
    </Fade>
  )
}
