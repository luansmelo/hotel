import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'

import { IInputResponse } from '@/atom/business'
import { handleToastify } from '@/utils/toastify'
import api from '@/config/configApi'

interface IInputContext {
  inputList: IInputResponse[]
  handleRequestNewInput: (newInput: IInputResponse) => Promise<void>
  handleUpdateInput: (inputId: string, input: IInputResponse) => Promise<void>
  handleDeleteInput: (inputId: string) => Promise<void>
  isAddLoading: boolean
  isUpdateLoading: boolean
}

const InputContext = createContext<IInputContext | null>(null)

export const InputProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [inputList, setInputList] = useState([])
  const [isAddLoading, setIsAddLoading] = useState(false)
  const [isUpdateLoading, setIsUpdateLoading] = useState(false)

  const fetchInputList = async () => {
    try {
      const response = await api.get('/input/all')

      response?.data && setInputList(response.data.inputList)
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const handleRequestNewInput = async (input: IInputResponse) => {
    try {
      setIsAddLoading(true)

      const response = await api.post('/input/create', input)

      if (response.status === 201) {
        setTimeout(() => {
          handleToastify('Insumo criado com sucesso!', 'success')
        }, 500)
      } else {
        setTimeout(() => {
          handleToastify('Não foi possível criar novo insumo.', 'error')
        }, 500)
      }
    } catch (error) {
      setTimeout(() => {
        handleToastify('Não foi possível criar novo insumo.', 'error')
      }, 500)
    } finally {
      setIsAddLoading(false)
      await fetchInputList()
    }
  }

  const handleUpdateInput = async (inputId: string, input: IInputResponse) => {
    try {
      setIsUpdateLoading(true)

      const response = await api.patch(`/input/${inputId}`, input)

      if (response.status === 200) {
        await fetchInputList()
        setTimeout(() => {
          handleToastify('Insumo atualizado com sucesso!', 'success')
        }, 500)
      } else {
        setTimeout(() => {
          handleToastify('Não foi possível atualizar o insumo.', 'error')
        }, 500)
      }
    } catch (error: any) {
      handleToastify('Não foi possível atualizar o insumo.', 'error')
    } finally {
      setIsUpdateLoading(false)
    }
  }

  const handleDeleteInput = async (id: string) => {
    try {
      setIsUpdateLoading(true)

      const response = await api.delete(`/input/${id}`)

      if (response.status === 200) {
        await fetchInputList()
        setTimeout(() => {
          handleToastify('Insumo excluído com sucesso!', 'success')
        }, 500)
      } else {
        setTimeout(() => {
          handleToastify('Não foi possível excluir o insumo.', 'error')
        }, 500)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsUpdateLoading(false)
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
        handleRequestNewInput,
        handleUpdateInput,
        handleDeleteInput,
      }}
    >
      {children}
    </InputContext.Provider>
  )
}

export const useInputContext = () => {
  const context = useContext(InputContext)
  if (!context) {
    throw new Error('useInputContext deve ser usado dentro de um InputProvider')
  }
  return context
}
