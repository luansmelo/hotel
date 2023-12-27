import { memo } from 'react'
import styles from './styles.module.scss'
import { Tab, Tabs } from '@mui/material'

export enum DATE_TABS {
  SEGUNDA,
  'TERÇA',
  QUARTA,
  QUINTA,
  SEXTA,
  'SÁBADO',
  DOMINGO,
}

const dateTabsList = [
  {
    name: 'Domingo',
    key: DATE_TABS.DOMINGO,
  },
  {
    name: 'Segunda',
    key: DATE_TABS.SEGUNDA,
  },
  {
    name: 'Terça',
    key: DATE_TABS.TERÇA,
  },
  {
    name: 'Quarta',
    key: DATE_TABS.QUARTA,
  },
  {
    name: 'Quinta',
    key: DATE_TABS.QUINTA,
  },
  {
    name: 'Sexta',
    key: DATE_TABS.SEXTA,
  },
  {
    name: 'Sábado',
    key: DATE_TABS.SÁBADO,
  },
]

interface IDateTabsProps {
  disabled?: boolean
  currentDateTab: DATE_TABS
  setCurrentDateTab: React.Dispatch<React.SetStateAction<DATE_TABS>>
}

const DateTabs = memo(
  ({ currentDateTab, disabled, setCurrentDateTab }: IDateTabsProps) => {
    const handleChange = (event: React.SyntheticEvent, newValue: DATE_TABS) => {
      setCurrentDateTab(newValue)
    }

    return (
      <div className={styles.DateTabsContainer}>
        <Tabs
          value={currentDateTab}
          disabled={disabled}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
          scrollButtons="auto"
          variant="fullWidth"
          sx={{
            color: disabled
              ? currentDateTab === DATE_TABS.DOMINGO
                ? '#036B85'
                : '#808080'
              : '#fff',
            '&.MuiTabs-root': {
              color: disabled
                ? currentDateTab === DATE_TABS.DOMINGO
                  ? '#036B85'
                  : '#808080'
                : '#BDBDBD',
            },
            '& .MuiTabs-flexContainer': {
              background: disabled ? '#272a34' : '#1F2128',
              borderRadius: '8px',
            },
            '& .MuiButtonBase-root.Mui-selected': {
              background: disabled ? '#272a34' : '#036B85',
              color: disabled
                ? currentDateTab === DATE_TABS.DOMINGO
                  ? '#808080'
                  : '#BDBDBD'
                : '#BDBDBD',
            },
            '& .MuiButtonBase-root.Mui-selected:first-child': {
              borderTopLeftRadius: '8px',
              borderBottomLeftRadius: '8px',
            },
            '& .MuiButtonBase-root.Mui-selected:last-child': {
              borderTopRightRadius: '8px',
              borderBottomRightRadius: '8px',
            },
            '& .MuiTabs-indicator': {
              background: disabled ? '#808080' : '#F27127',
            },
          }}
        >
          {dateTabsList.map((date) => (
            <Tab
              key={date.key}
              value={date.key}
              label={date.name}
              disabled={disabled}
              sx={{
                color: disabled
                  ? currentDateTab === DATE_TABS.DOMINGO
                    ? '#036B85'
                    : '#808080'
                  : '#BDBDBD',
                '&:hover': {
                  color: disabled
                    ? currentDateTab === DATE_TABS.DOMINGO
                      ? '#036B85'
                      : '#808080'
                    : '#FFF',
                  background: disabled ? '#A9A9A9' : '#0488A6',
                },
              }}
            />
          ))}
        </Tabs>
      </div>
    )
  }
)

export default DateTabs
