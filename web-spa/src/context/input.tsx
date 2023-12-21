'use client'
import React, {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
} from 'react'
import { InputContract } from '@/atom/business'
import { handleToastify } from '@/utils/toastify'
import { InputService } from '@/services/input/input'
import { toast } from 'react-toastify'
import { Input } from '@/components/input/types'

export interface InputErrors {
  [key: string]: string
}

interface InputContextContract {
  inputList: Input[]
  loading: boolean
  setInputList: React.Dispatch<React.SetStateAction<Input[]>>
  handleCreate: (input: InputContract) => Promise<void>
  handleEdit: (input: InputContract) => Promise<void>
  handleDelete: (id: string) => Promise<void>
  errors: Partial<InputContract>
  setErrors: React.Dispatch<React.SetStateAction<Partial<InputErrors>>>
}

export const InputContext = createContext<InputContextContract>(
  {} as InputContextContract
)

export const InputProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [inputList, setInputList] = useState<Input[]>([] as Input[])
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<Partial<InputErrors>>({})

  const input = useMemo(() => new InputService(), [])

  const fetchInputList = async () => {
    setLoading(true)
    try {
      const res = await input.list()
      setInputList(res?.data)
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }
  }
  const handleCreate = async (data: InputContract) => {
    try {
      setLoading(true)

      const res = await input.handle(data)

      if (res?.ok) {
        toast.success('Insumo criado com sucesso!')
        await fetchInputList()
      } else {
        setErrors({
          createError: 'Não foi possível criar novo insumo.',
        })
      }
    } catch (error: any) {
      toast.error('Não foi possível criar novo insumo.')
      setErrors({
        createError: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = async (data: InputContract) => {
    try {
      setLoading(true)

      const res = await input.update(data)
      if (res.message === 'sucesso') {
        handleToastify('Insumo atualizado com sucesso!', 'success')
        await fetchInputList()
      }
    } catch (error) {
      console.log('error')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      setLoading(true)

      const res = await input.delete(id)

      if (res.message === 'sucesso') {
        await fetchInputList()
        handleToastify('Insumo excluído com sucesso!', 'success')
      }
    } catch (error) {
      console.log(error)
      handleToastify('Não foi possível excluir o insumo.', 'error')
    } finally {
      setLoading(false)
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
        errors,
        setInputList,
        setErrors,
        handleEdit,
        handleCreate,
        handleDelete,
      }}
    >
      {children}
    </InputContext.Provider>
  )
}
