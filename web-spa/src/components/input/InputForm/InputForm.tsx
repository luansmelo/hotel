import { IInputFormProps } from './types'
import { Save } from 'lucide-react'
import styles from './styles.module.scss'
import AddButton from '@/components/addButton'

export const InputForm: React.FC<IInputFormProps> = ({
  children,
  loading,
  submit,
}) => {
  return (
    <div className={styles.containerWrapper}>
      <form
        className={styles.formWrapper}
        onSubmit={(e) => {
          e.preventDefault()
          submit(e)
        }}
      >
        {children}
        <div className={styles.buttonContainer}>
          <hr className={styles.hr} />
          <AddButton loading={loading} text="Adicionar" Icon={Save} />
        </div>
      </form>
    </div>
  )
}
