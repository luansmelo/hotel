import AddButton from '@/components/addButton'
import { IInputFormProps } from './types'

export const InputForm: React.FC<IInputFormProps> = ({
  children,
  loading,
  submit,
}) => {
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          console.log('Form submitted')
          submit(e)
        }}
      >
        {children}
        <AddButton text="Criar" loading={loading} />
      </form>
    </div>
  )
}
