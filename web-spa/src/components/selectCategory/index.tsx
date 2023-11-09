import { FormControl, MenuItem, Select } from '@mui/material'
import styles from './styles.module.scss'
// import { useAppContext } from '@/context/app'
// import { useAtom } from 'jotai'
// import { businessAtom } from '@/atom/business'

interface ISelectCategoryProps {
  color?: string
  data: string[]
  value: string
  onClick: (value: string) => void
}

export default function SelectCategory({
  color,
  data,
  value,
  onClick,
}: ISelectCategoryProps) {
  console.log(value)
  return (
    <div className={styles.SelectCategory}>
      <FormControl fullWidth>
        <Select
          id="demo-simple-select"
          value={value}
          onChange={(event) => onClick(event.target.value)}
          sx={{
            '& .MuiSelect-select': {
              backgroundColor: `${color}`,
              color: '#ffffff',
              fontSize: '18px',
            },
            // '&. MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root.Mui-focused':
            //   {
            //     borderColor: `${color}`,
            //   },
          }}
        >
          {data.map((businness) => {
            return (
              <MenuItem
                key={businness}
                value={businness}
                sx={{
                  '&:hover': {
                    background: `${color}40`,
                  },
                  '&:hover.Mui-selected': {
                    background: `${color}40`,
                  },
                  '&.Mui-selected': {
                    backgroundColor: `${color}10`,
                  },
                }}
              >
                {businness}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </div>
  )
}
