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
          displayEmpty
          sx={{
            width: '200px',
            '& .MuiSelect-select': {
              backgroundColor: '#1F2128',
              color: '#BDBDBD',
              padding: '12px 16px',
              border: '1px solid #0488A6',
              borderRadius: '4px',
              '&:hover': {
                borderColor: '#0488A6',
              },
            },
            '& .MuiSelect-icon': {
              fill: '#0488A6',
            },
            '& .MuiListItem-root': {
              '&:hover': {
                backgroundColor: '#0488A6',
                color: '#fff',
              },
              '&.Mui-selected': {
                backgroundColor: '#0488A6',
                color: '#fff',
              },
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                outline: '1px solid #0488A6',
                background: '#1F2128',
                color: '#BDBDBD',
              },
            },
          }}
        >
          {data?.map((input: any) => (
            <MenuItem key={input.id} value={input?.name}>
              {input?.name}
            </MenuItem>
          ))}
        </MSelect>
      </FormControl>
    </div>
  )
}
