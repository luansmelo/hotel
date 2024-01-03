import {
  Autocomplete as MuiAutocomplete,
  TextField,
  Paper,
} from '@mui/material'
import { FC } from 'react'

export interface AutoCompleteProps<T = unknown> {
  label: string
  disabled?: boolean
  data?: T[]
  value?: string
  addSelectedItem: (value: string) => void
}

export interface Item {
  id?: string
  name: string
}

const AutoComplete: FC<AutoCompleteProps<Item>> = ({
  label,
  data,
  disabled,
  value,
  addSelectedItem,
}) => {
  return (
    <MuiAutocomplete
      size="small"
      disablePortal
      id="combo-box-demo"
      value={value || null}
      options={((Array.isArray(data) && data) || []).map((item) => item.name)}
      disabled={disabled}
      sx={{
        '& .MuiAutocomplete-inputRoot': {
          height: '40px',
          width: '100%',
          background: '#272a34',
          color: '#BDBDBD',
        },
        width: '100%',
        '& .MuiAutocomplete-listbox li:hover': {
          background: '#0488A6',
        },
        '& .MuiAutocomplete-popupIndicator': {
          color: '#0488A6',
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputLabelProps={{
            style: {
              color: '#BDBDBD',
            },
          }}
          fullWidth
        />
      )}
      PaperComponent={({ children }) => (
        <Paper
          elevation={3}
          sx={{
            background: '#272a34',
            marginTop: '8px',
            color: '#BDBDBD',
          }}
        >
          {children}
        </Paper>
      )}
      onChange={(_, value) => addSelectedItem(value || '')}
    />
  )
}

export default AutoComplete
