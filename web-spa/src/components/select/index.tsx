import { FormControl, MenuItem, Select as MSelect } from '@mui/material'
import styles from './styles.module.scss'
import { SelectProps } from './types'

export default function Select({
  data,
  value,
  disabled,
  onClick,
}: SelectProps) {
  return (
    <div className={styles.Select}>
      <FormControl fullWidth>
        <MSelect
          id="demo-simple-select"
          value={value}
          disabled={disabled}
          onChange={(e) => onClick(e.target.value)}
          displayEmpty
          sx={{
            width: '200px',
            '& .MuiSelect-select': {
              backgroundColor: disabled ? '#272a34' : '#1F2128',
              color: disabled ? '#808080' : '#BDBDBD',
              padding: '12px 16px',
              border: '1px solid #0488A6',
              borderRadius: '4px',
              '&:hover': {
                borderColor: '#0488A6',
              },
            },
            '& .MuiSelect-icon': {
              fill: disabled ? '#808080' : '#0488A6',
              opacity: disabled ? 0.6 : 1,
            },
            '& .MuiListItem-root': {
              '&:hover': {
                backgroundColor: disabled ? '#A9A9A9' : '#0488A6',
                color: disabled ? '#808080' : '#fff',
              },
              '&.Mui-selected': {
                backgroundColor: disabled ? '#A9A9A9' : '#0488A6',
                color: disabled ? '#808080' : '#fff',
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
