import { TextField as MUITextField } from '@mui/material'
import { ITextFieldProps } from './types'

const TextField = ({
  label,
  value,
  onChange,
  height,
  name,
}: ITextFieldProps) => {
  return (
    <MUITextField
      fullWidth
      size="small"
      id={name}
      label={label}
      name={name}
      variant="outlined"
      value={value}
      onChange={onChange}
      autoComplete="off"
      sx={{
        minHeight: `${height}px` || 'auto',
      }}
      InputProps={{
        style: {
          background: '#1F2128',
          color: '#BDBDBD',
          outline: 'none',
          margin: 0,
        },
      }}
      InputLabelProps={{
        style: {
          color: '#BDBDBD',
        },
      }}
      // error={!!errors.name}
      // helperText={errors.name}
    />
  )
}

export default TextField
