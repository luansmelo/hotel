'use client'
import SelectBusiness from '@/components/selectBusiness'
import styles from './styles.module.scss'
import DateTabs, { DATE_TABS } from '@/components/DateTabs'
import { useState, useContext } from 'react'
import { Fade, TextField } from '@mui/material'
import SelectCategory from '@/components/selectCategory'
import { categoryList, useMapContext } from '@/context/MapaContext'
import ProductListTable from './MenuProductTable'
import { ProductContext } from '@/context/product'

const colorObj: Record<string, string> = {
  'Café da Manhã': '#FFD700',
  Piscina: '#00BFFF',
  Almoço: '#228B22 ',
  'Café da Tarde': '#FFA500 ',
  Janta: '#8B0000 ',
  Ceia: '#9400D3 ',
}

export default function ProductionMap() {
  const [peopleNumber, setPeopleNumber] = useState(1)
  const {
    currentSelectCategory,
    setcurrentSelectCategory,
    currentDateTab,
    setCurrentDateTab,
  } = useMapContext()

  const { productList } = useContext(ProductContext)

  const handleChangeQttyPerson = (value: number) => {
    if (value > 0) setPeopleNumber(value)
  }

  return (
    <Fade in={true} timeout={500}>
      <div className={styles.productListContainer}>
        <div className={styles.buttonsContainer}>
          <SelectBusiness />
          <div style={{ width: '100px', marginLeft: '12px' }}>
            <TextField
              type="number"
              id="people-number"
              label="Qtd Pessoas"
              variant="outlined"
              value={peopleNumber}
              onChange={(event) => {
                handleChangeQttyPerson(parseFloat(event.target.value))
              }}
            />
          </div>
        </div>
        <div className={styles.DateTabsContainer}>
          <SelectCategory
            color={colorObj[currentSelectCategory] ?? ''}
            data={categoryList}
            onClick={setcurrentSelectCategory}
            value={currentSelectCategory}
          />
          <DateTabs
            currentDateTab={currentDateTab}
            setCurrentDateTab={setCurrentDateTab}
          />
        </div>
        <div>
          <ProductListTable headColor={colorObj[currentSelectCategory] ?? ''} />
        </div>
      </div>
    </Fade>
  )
}
