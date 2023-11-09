import { Autocomplete, TextField } from '@mui/material'
import styles from './styles.module.scss'

interface IModalTemplateProps {
  title: string
  onClose: () => void
  children: React.ReactNode
}
export default function CreateMenu() {
  return (
    <div className={styles.createMenuContainer}>
      <Autocomplete
        // size="small"
        disablePortal
        style={{ marginBottom: '12px' }}
        id="combo-box-demo"
        options={['1', '2']}
        sx={{ width: '100%' }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Insumos"
            onClick={(event) => console.log('')}
          />
        )}
      />
    </div>
  )
}
