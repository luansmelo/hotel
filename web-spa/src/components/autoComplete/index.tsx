import {
  Autocomplete as MuiAutocomplete,
  TextField,
  Paper,
} from '@mui/material'
import { FC } from 'react'

export interface AutoCompleteProps<T = unknown> {
  label: string
  data?: T[]
  addSelectedItem: (value: string) => void
}

export interface Item {
  id?: string
  name: string
}

const AutoComplete: FC<AutoCompleteProps<Item>> = ({
  label,
  data,
  addSelectedItem,
}) => {
  return (
    <MuiAutocomplete
      size="small"
      disablePortal
      id="combo-box-demo"
      value={null}
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
        '& .MuiAutocomplete-listbox li:hover': {
          background: '#0488A6',
        },
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
