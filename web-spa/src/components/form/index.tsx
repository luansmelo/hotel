import { Save } from 'lucide-react'
import styles from './styles.module.scss'
import AddButton from '@/components/addButton'
import { Box } from '@mui/material'
import { FormProps } from './types'

export const Form: React.FC<FormProps> = ({
  children,
  loading,
  submit,
  text,
}) => {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'space-between'}
      width={'480px'}
      p={3}
      sx={{
        '& > :not(style)': {
          maxHeight: '500px',
        },
      }}
      component="form"
      onSubmit={(e) => {
        e.preventDefault()
        submit(e)
      }}
    >
      {children}
      <div className={styles.buttonContainer}>
        <hr className={styles.hr} />
        <AddButton loading={loading} text={text} Icon={Save} />
        <div></div>
      </div>
    </Box>
  )
}
