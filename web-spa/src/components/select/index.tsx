import { FormControl, MenuItem, Select as MSelect } from '@mui/material'
import styles from './styles.module.scss'
import { SelectProps } from './types'

export default function Select({ data, value, onClick }: SelectProps) {
  return (
    <div className={styles.Select}>
      <FormControl fullWidth>
        <MSelect
          id="demo-simple-select"
          value={value}
          onChange={(event) => onClick(event.target.value)}
          sx={{
            '& .MuiSelect-select': {
              backgroundColor: '#1F2128',
              color: '#BDBDBD',
              padding: '12px 16px',
            },
          }}
        >
          {data.map((businness) => {
            return (
              <MenuItem key={businness} value={businness}>
                {businness}
              </MenuItem>
            )
          })}
        </MSelect>
      </FormControl>
    </div>
  )
}
