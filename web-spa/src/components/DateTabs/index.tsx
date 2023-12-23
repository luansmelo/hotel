import styles from './styles.module.scss'
import { Tab, Tabs } from '@mui/material'

export enum DATE_TABS {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
}

const dateTabsList = [
  {
    name: 'Domingo',
    key: DATE_TABS.SUNDAY,
  },
  {
    name: 'Segunda',
    key: DATE_TABS.MONDAY,
  },
  {
    name: 'Terça',
    key: DATE_TABS.TUESDAY,
  },
  {
    name: 'Quarta',
    key: DATE_TABS.WEDNESDAY,
  },
  {
    name: 'Quinta',
    key: DATE_TABS.THURSDAY,
  },
  {
    name: 'Sexta',
    key: DATE_TABS.FRIDAY,
  },
  {
    name: 'Sábado',
    key: DATE_TABS.SATURDAY,
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
        {dateTabsList.map((date) => {
          return <Tab key={date.key} value={date.key} label={date.name} />
        })}
      </Tabs>
    </div>
  )
}
