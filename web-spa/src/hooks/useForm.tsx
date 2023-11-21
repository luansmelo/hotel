import { useState } from 'react'

const useForm = <T extends object>(initialState: T) => {
  const [form, setForm] = useState(initialState)

  const handleSetState = (e: React.ChangeEvent<HTMLInputElement>) => {
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
