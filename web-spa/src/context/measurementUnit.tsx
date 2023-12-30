'use client'
import React, {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
} from 'react'
import { handleToastify } from '@/utils/toastify'
import { toast } from 'react-toastify'
import {
  Error,
  MeasurementUnitContract,
  MeasurementUnitProps,
} from '@/components/input/MeasurementUnit/types'
import { MeasurementUnitService } from '@/services/measurementUnit'

interface MeasurementUnitContextContract {
  loading: boolean
  measurementUnitList: MeasurementUnitContract[]
  errors: Partial<MeasurementUnitProps>
  setMeasurementList: React.Dispatch<
    React.SetStateAction<MeasurementUnitContract[]>
  >
  handleMeasurementSave: (input: MeasurementUnitContract) => Promise<void>
  handleEdit: (input: MeasurementUnitContract) => Promise<void>
  handleDelete: (id: string) => Promise<void>
  setErrors: React.Dispatch<React.SetStateAction<Partial<Error>>>
}

export const MeasurementUnitContext =
  createContext<MeasurementUnitContextContract>(
    {} as MeasurementUnitContextContract
  )

export const MeasurementUnitProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [measurementUnitList, setMeasurementList] = useState<
    MeasurementUnitContract[]
  >([] as MeasurementUnitContract[])
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<Partial<Error>>({})

  const measurementUnit = useMemo(() => new MeasurementUnitService(), [])

  const fetchMeasurementUnitList = async () => {
    setLoading(true)
    try {
      const res = await measurementUnit.list()
      setMeasurementList(res)
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }
  }
  const handleMeasurementSave = async (data: MeasurementUnitContract) => {
    try {
      setLoading(true)

      const res = await measurementUnit.handle(data)

      if (res?.ok) {
        toast.success('Unidade de medida criada com sucesso!')
        await fetchMeasurementUnitList()
      } else {
        setErrors({
          createError: 'Não foi possível criar uma unidade de medida.',
        })
      }
    } catch (error) {
      setMeasurementList([])
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = async (data: MeasurementUnitContract) => {
    try {
      setLoading(true)

      const res = await measurementUnit.update(data)
      if (res.message === 'sucesso') {
        handleToastify('Unidade de medida atualizada com sucesso!', 'success')
        await fetchMeasurementUnitList()
      }
    } catch (error) {
      setMeasurementList([])
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      setLoading(true)

      const res = await measurementUnit.delete(id)

      if (res.message === 'sucesso') {
        await fetchMeasurementUnitList()
        handleToastify('Unidade de medida excluída com sucesso!', 'success')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setMeasurementList([])
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMeasurementUnitList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MeasurementUnitContext.Provider
      value={{
        measurementUnitList,
        loading,
        errors,
        setMeasurementList,
        setErrors,
        handleEdit,
        handleMeasurementSave,
        handleDelete,
      }}
    >
      {children}
    </MeasurementUnitContext.Provider>
  )
}
