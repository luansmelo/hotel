import {
  FormControl,
  MenuItem,
  Select as MSelect,
  FormHelperText,
  InputProps,
} from '@mui/material'
import styles from './styles.module.scss'
import { SelectProps } from './types'

export default function Select({
  key,
  name,
  data,
  value,
  disabled,
  width,
  errors,
  placeholder,
  defaultValue,
  onClick,
}: SelectProps) {
  const hasValue = Boolean(value)
  return (
    <div className={styles.Select}>
      <FormControl fullWidth>
        <MSelect
          key={key}
          displayEmpty
          name={name}
          value={value}
          defaultValue={defaultValue}
          onChange={onClick}
          inputProps={{ id: `select-${name}` }}
          sx={{
            width: width ? width : '200px',
            '& .MuiSelect-select': {
              backgroundColor: disabled ? '#272a34' : '#1F2128',
              color: disabled ? '#808080' : '#BDBDBD',
              padding: '8.5px 14px',
              borderRadius: '4px',
              outline: 'none',
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
            '& .MuiInputLabel-outlined': {
              transform: hasValue
                ? 'translate(14px, -10px) scale(0.75)'
                : 'translate(14px, 14px) scale(1)',
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                outline: '1px solid #0488A6',
                background: '#1F2128',
                color: '#BDBDBD',
                padding: '0px',
              },
            },
          }}
        >
          {!hasValue && (
            <MenuItem disabled={!hasValue} value="">
              {placeholder}
            </MenuItem>
          )}
          {data?.map((input: InputProps) => (
            <MenuItem key={input.id} value={input?.name}>
              {input?.name}
            </MenuItem>
          ))}
          errors={!!errors}
        </MSelect>
        <FormHelperText
          sx={{
            padding: 0,
            margin: 0,
            color: '#f44336',
          }}
        >
          {errors}
        </FormHelperText>
      </FormControl>
    </div>
  )
}
