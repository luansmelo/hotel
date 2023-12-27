import { Autocomplete as MuiAutocomplete, TextField } from '@mui/material'

export interface AutoCompleteProps<T = any> {
  label: string
  data?: T[]
  addSelectedItem: (value: string) => void
}

export interface Item {
  id?: string
  name: string
}

export const AutoComplete = <T extends Item>({
  label,
  data,

  addSelectedItem,
}: AutoCompleteProps<T>) => {
  return (
    <MuiAutocomplete
      size="small"
      disablePortal
      id="combo-box-demo"
      value={''}
      options={(data || []).map((item) => item.name)}
      sx={{
        '& .MuiAutocomplete-inputRoot': {
          height: '40px',
          width: '100%',
          background: '#272a34',
          borderColor: '#0488A6',
          color: '#BDBDBD',
        },
        width: '100%',
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          sx={{
            color: '#BDBDBD',
            '& fieldset': {
              borderColor: '#0488A6',
            },
            '&:hover fieldset': {
              borderColor: '#0488A6',
            },
          }}
          InputLabelProps={{
            style: {
              color: '#BDBDBD',
            },
          }}
          fullWidth
        />
      )}
      onChange={(_, value) => addSelectedItem(value || '')}
    />
  )
}
