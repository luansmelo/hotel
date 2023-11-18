'use client'
import React, { createContext, ReactNode, useState, useEffect } from 'react'
import { InputContract } from '@/atom/business'
import { handleToastify } from '@/utils/toastify'
import api from '@/config/api'
import { InputService } from '@/services/input/input'
import { toast } from 'react-toastify'
import { InputProps } from '@/components/input/InputList/types'

interface InputContextContract {
  inputList: InputProps[]
  loading: boolean
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
  const [inputList, setInputList] = useState<InputProps[]>([] as InputProps[])
  const [loading, setLoading] = useState<boolean>(false)
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false)

  const input = new InputService()
  const fetchInputList = async () => {
    try {
      setLoading(true)
      const res = await input.list()
      setInputList(res?.data)
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 1500)
    }
  }

  const handleRequestInput = async (data: InputContract) => {
    try {
      setLoading(true)

      const res = await input.handle(data)
      if (res?.ok) {
        toast.success('Insumo criado com sucesso!')
        await fetchInputList()
      } else {
        toast.error('Não foi possível criar novo insumo.')
      }
    } catch (error) {
      toast.error('Não foi possível criar novo insumo.')
    } finally {
      setLoading(false)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <InputContext.Provider
      value={{
        inputList,
        loading,
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
