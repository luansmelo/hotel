import { TextField as MUITextField, FormHelperText } from '@mui/material'
import { ITextFieldProps } from './types'

const TextField = ({
  label,
  value,
  height,
  errors,
  name,
  multiline,
  defaultValue,
  rows,
  onChange,
}: ITextFieldProps) => {
  return (
    <div>
      <MUITextField
        fullWidth
        size="small"
        id={name}
        label={label}
        name={name}
        multiline={multiline}
        rows={rows}
        defaultValue={defaultValue}
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
        error={!!errors}
      />
      <FormHelperText
        sx={{
          padding: 0,
          color: '#f44336',
        }}
      >
        {errors}
      </FormHelperText>
    </div>
  )
}

export default TextField
