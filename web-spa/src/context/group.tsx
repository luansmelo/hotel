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
import { GroupForm, GroupProps } from '@/utils/interfaces/group'
import { GroupService } from '@/services/group'

interface GroupContextContract {
  loading: boolean
  groupList: GroupProps[]
  errors: Partial<GroupProps>
  setGroupList: React.Dispatch<React.SetStateAction<GroupProps[]>>
  handleGroupSave: (input: GroupForm) => Promise<void>
  handleEdit: (input: GroupProps) => Promise<void>
  handleDelete: (id: string) => Promise<void>
  setErrors: React.Dispatch<React.SetStateAction<Partial<Error>>>
}

export const GroupContext = createContext<GroupContextContract>(
  {} as GroupContextContract
)

export const GroupProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [groupList, setGroupList] = useState<GroupProps[]>([] as GroupProps[])
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<Partial<Error>>({})

  const group = useMemo(() => new GroupService(), [])

  const fetchGroupList = async () => {
    setLoading(true)
    try {
      const res = await group.list()
      setGroupList(res)
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }
  }
  const handleGroupSave = async (data: GroupForm) => {
    try {
      setLoading(true)

      const res = await group.handle(data)

      if (res?.ok) {
        toast.success('grupo criada com sucesso!')
        await fetchGroupList()
      }
    } catch (error) {
      toast.error('Não foi possível criar um grupo.')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = async (data: GroupProps) => {
    try {
      setLoading(true)

      const res = await group.update(data)

      console.log(res, 'res')
      if (res) {
        handleToastify('grupo atualizada com sucesso!', 'success')
      } else {
        handleToastify('Não foi possível atualizar o grupo.', 'error')
      }
    } catch (error) {
      console.log('error')
    } finally {
      await fetchGroupList()
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      setLoading(true)

      const res = await group.delete(id)

      if (res?.message === 'sucesso') {
        handleToastify('grupo excluída com sucesso!', 'success')
        await fetchGroupList()
      } else {
        handleToastify('Não foi possível excluir o grupo.', 'error')
      }
    } catch (error) {
      handleToastify('Não foi possível excluir a grupo.', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGroupList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <GroupContext.Provider
      value={{
        groupList,
        loading,
        errors,
        setGroupList,
        setErrors,
        handleEdit,
        handleGroupSave,
        handleDelete,
      }}
    >
      {children}
    </GroupContext.Provider>
  )
}
