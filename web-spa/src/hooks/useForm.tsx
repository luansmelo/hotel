import { useState, ChangeEvent } from 'react'

interface SelectChangeEvent<T = string> {
  target: {
    name: string
    value: T
  }
}

export type FormInputEvent =
  | ChangeEvent<HTMLInputElement>
  | SelectChangeEvent<string>

const useForm = <T extends object>(initialState: T) => {
  const [form, setForm] = useState(initialState)

  const handleSetState = (e: FormInputEvent) => {
    const { name, value } = e.target
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const clear = () => {
    setForm(initialState)
  }

  return { form, handleSetState, clear, setForm }
}

export default useForm
