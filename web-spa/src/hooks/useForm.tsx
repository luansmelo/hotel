import { useState, ChangeEvent } from 'react'

interface SelectChangeEvent<T = string> {
  target: {
    name: string
    value: T
  }
}

type FormInputEvent = ChangeEvent<HTMLInputElement> | SelectChangeEvent

const useForm = <T extends object>(initialState: T) => {
  const [form, setForm] = useState(initialState)

  const handleSetState = (e: FormInputEvent) => {
    const { name, value } = e.target
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  console.log("FORM", form)

  const clear = () => {
    setForm(initialState)
  }

  return { form, handleSetState, clear, setForm }
}

export default useForm
