'use client'
import React, { createContext, ReactNode, useState, useEffect } from 'react'
import { InputContract } from '@/atom/business'
import { handleToastify } from '@/utils/toastify'
import api from '@/config/api'
import { InputService } from '@/services/input/input'

interface InputContextContract {
  inputList: InputContract[]
  isAddLoading: boolean
  isUpdateLoading: boolean
  handleRequestInput: (input: InputContract) => Promise<void>
  handleUpdateInput: (input: InputContract) => Promise<void>
  handleDeleteInput: (input: InputContract) => Promise<void>
}

export const InputContext = createContext<InputContextContract>(
  {} as InputContextContract
)

export const InputProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [inputList, setInputList] = useState<InputContract[]>([])
  const [isAddLoading, setIsAddLoading] = useState<boolean>(false)
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false)

  const input = new InputService()
  const fetchInputList = async () => {
    try {
      const res = await input.list()
      console.log('RESPOSTA', res)
      if (res?.ok) {
        const data = await res.json()
        console.log(data)
        setInputList(data)
      }
    } catch (error) {
      setInputList([])
    }
  }

  const handleRequestInput = async (data: InputContract) => {
    try {
      setIsAddLoading(true)

      const res = await input.handle(data)
      if (res?.ok) {
        await fetchInputList()
        handleToastify('Insumo criado com sucesso!', 'success')
        setIsAddLoading(false)
      } else {
        handleToastify('Não foi possível criar novo insumo.', 'error')
      }
    } catch (error) {
      handleToastify('Não foi possível criar novo insumo.', 'error')
    }
  }

  const handleUpdateInput = async (input: InputContract) => {
    try {
      setIsUpdateLoading(true)
      alert(input.id)

      const response = await api.patch(`/input/${input.id}`, input)

      if (response.status === 200) {
        await fetchInputList()
        setTimeout(() => {
          handleToastify('Insumo atualizado com sucesso!', 'success')
        }, 500)
      } else {
        setTimeout(() => {
          handleToastify('Não foi possível atualizar o insumo.', 'error')
        })
      }
    } catch (error) {
      setTimeout(() => {
        handleToastify('Não foi possível atualizar o insumo.', 'error')
      })
    }
  }

  const handleDeleteInput = async (input: InputContract) => {
    try {
      setIsUpdateLoading(true)

      const response = await api.delete(`/input/${input.id}`)

      if (response.status === 200) {
        await fetchInputList()
        setTimeout(() => {
          handleToastify('Insumo excluído com sucesso!', 'success')
        }, 500)
      } else {
        setTimeout(() => {
          handleToastify('Não foi possível excluir o insumo.', 'error')
        })
      }
    } catch (error) {
      setTimeout(() => {
        handleToastify('Não foi possível excluir o insumo.', 'error')
      })
    }
  }

  useEffect(() => {
    fetchInputList()
  }, [])

  return (
    <InputContext.Provider
      value={{
        inputList,
        isAddLoading,
        isUpdateLoading,
        handleUpdateInput,
        handleRequestInput,
        handleDeleteInput,
      }}
    >
      {children}
    </InputContext.Provider>
  )
}
