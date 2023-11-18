import { Fade, FormControl, MenuItem, Select, TextField } from '@mui/material'
import styles from './styles.module.scss'
import { Plus, Save, X } from 'lucide-react'
import { useState } from 'react'
import { handleToastify } from '@/utils/toastify'
import { Hypnosis } from 'react-cssfx-loading'
import { useBusinessContext } from '@/context/BusinessContext'

export default function SelectBusiness() {
  const [isAddBusiness, setAddBusiness] = useState(false)
  const [newBusinessName, setNewBusinessName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { menuList, currentMenu, setCurrentMenu, fetchMenuList } =
    useBusinessContext()

  console.log('currentMenu:', currentMenu)
  console.log('menuList:', menuList)
  const { currentFeature } = useAppContext()

  const handleNewBusinessNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewBusinessName(event.target.value)
  }

  const handleSelectMenu = (value: string) => {
    setCurrentMenu(value)
  }

  const handleRequestNewMenu = async () => {
    try {
      setIsLoading(true)
      const URL_API_POST_NEW_USER = 'https://localhost:7196/api/menu/createMenu'
      const response = await fetch(URL_API_POST_NEW_USER, {
        method: 'POST',
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Name: newBusinessName }),
      })

      if (response.ok) {
        const data = await response.json()
        setTimeout(() => {
          handleToastify(data.message, 'success')
          fetchMenuList()
        }, 2000)
      } else {
        const errorData = await response.json()
        setTimeout(() => {
          handleToastify(errorData.message, 'error')
        }, 2000)
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false)
        setNewBusinessName('')
        setAddBusiness(false)
      }, 2000)
    }
  }

  const handleClickSaveNewBusiness = async () => {
    await handleRequestNewMenu()
  }

  return (
    <div className={styles.SelectBusinessContainer}>
      {isAddBusiness || menuList?.length == 0 ? (
        <Fade in={true} timeout={750}>
          <div className={styles.SelectBusinessContent}>
            {isLoading ? (
              <div
                style={{
                  width: '220px',
                  height: '56px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Hypnosis color="#F28482" />
              </div>
            ) : (
              <TextField
                id="add-Business"
                variant="outlined"
                placeholder="Escreva aqui..."
                value={newBusinessName}
                onChange={handleNewBusinessNameChange}
                fullWidth
              />
            )}

            <div style={{ display: 'flex', gap: '12px' }}>
              <div
                className={styles.IconWrapper}
                style={
                  newBusinessName.length < 3 || isLoading
                    ? { pointerEvents: 'none', opacity: 0.6 }
                    : {}
                }
                onClick={() => handleClickSaveNewBusiness()}
              >
                <Save height={24} width={24} />
              </div>
              {!isLoading && (
                <div
                  className={styles.IconWrapper}
                  onClick={() => setAddBusiness(false)}
                >
                  <X height={24} width={24} />
                </div>
              )}
            </div>
          </div>
        </Fade>
      ) : (
        <div className={styles.SelectBusinessContent}>
          <Fade in={true} timeout={750}>
            <FormControl fullWidth>
              <Select
                id="demo-simple-select"
                value={currentMenu || menuList[0]}
                onChange={(event) => handleSelectMenu(event.target.value)}
                sx={{
                  '& .MuiSelect-select': {
                    width: '220px',
                    backgroundColor: '#fdedec',
                    color: '#F28482',
                    borderColor: '#F28482',
                  },
                }}
              >
                {menuList?.map((businness) => {
                  return (
                    <MenuItem key={businness} value={businness}>
                      {businness}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Fade>

          {currentFeature === FEATURES.MENU_MAP && (
            <div
              className={styles.IconWrapper}
              onClick={() => setAddBusiness(true)}
            >
              <Fade in={true} timeout={750}>
                <Plus height={24} width={24} />
              </Fade>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
