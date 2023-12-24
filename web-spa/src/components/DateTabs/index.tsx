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
  currentDateTab: DATE_TABS
  setCurrentDateTab: React.Dispatch<React.SetStateAction<DATE_TABS>>
}

export default function DateTabs({
  currentDateTab,
  setCurrentDateTab,
}: IDateTabsProps) {
  const handleChange = (event: React.SyntheticEvent, newValue: DATE_TABS) => {
    setCurrentDateTab(newValue)
  }

  return (
    <div className={styles.DateTabsContainer}>
      <Tabs
        value={currentDateTab}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
        scrollButtons="auto"
        variant="fullWidth"
        sx={{
          color: '#fff',
          '&.MuiTabs-root': {
            color: '#BDBDBD',
          },
          '& .MuiTabs-flexContainer': {
            background: '#1F2128',
            borderRadius: '8px',
          },
          '& .MuiButtonBase-root.Mui-selected': {
            background: '#036B85',
            color: '#BDBDBD',
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
            background: '#F27127',
          },
        }}
      >
        {dateTabsList.map((date) => (
          <Tab
            key={date.key}
            value={date.key}
            label={date.name}
            sx={{
              color: '#BDBDBD',
              '&:hover': {
                color: '#FFF',
                background: '#0488A6',
              },
            }}
          />
        ))}
      </Tabs>
    </div>
  )
}
