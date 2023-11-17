import { useState, ChangeEvent } from 'react'

type FormFields = Record<string, any>

type FormProps<T> = {
  initialState: T
}

const useForm = <T extends FormFields>({ initialState }: FormProps<T>) => {
  const [form, setForm] = useState<T>(initialState)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setForm((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      }
    })
  }
  const clear = () => {
    setForm(initialState)
  }

  return { form, handleInputChange, clear }
}

export default useForm
