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
import { MeasurementUnitService } from '@/services/measurementUnit'
import { MeasurementProps } from '@/components/measurementUnit/MeasurementForm/types'

interface MeasurementUnitContextContract {
  loading: boolean
  measurementUnitList: MeasurementProps[]
  setMeasurementList: React.Dispatch<React.SetStateAction<MeasurementProps[]>>
  handleMeasurementSave: (input: MeasurementProps) => Promise<void>
  handleEdit: (input: MeasurementProps) => Promise<void>
  handleDelete: (id: string) => Promise<void>
}

export const MeasurementUnitContext =
  createContext<MeasurementUnitContextContract>(
    {} as MeasurementUnitContextContract
  )

export const MeasurementUnitProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [measurementUnitList, setMeasurementList] = useState<
    MeasurementProps[]
  >([] as MeasurementProps[])
  const [loading, setLoading] = useState<boolean>(false)

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
  const handleMeasurementSave = async (data: MeasurementProps) => {
    try {
      setLoading(true)

      const res = await measurementUnit.handle(data)

      if (res?.ok) {
        toast.success('Unidade de medida criada com sucesso!')
        await fetchMeasurementUnitList()
      } else {
        toast.error('Não foi possível criar uma unidade de medida.')
      }
    } catch (error) {
      setMeasurementList([])
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = async (data: MeasurementProps) => {
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
        setMeasurementList,
        handleEdit,
        handleMeasurementSave,
        handleDelete,
      }}
    >
      {children}
    </MeasurementUnitContext.Provider>
  )
}
