'use client'
import { useContext } from 'react'
import { Typography, MenuItem } from '@mui/material'
import { AuthContext } from '@/context/auth'
import UserMenu from '@/components/userMenu'
import styles from './styles.module.scss'
export default function Header() {
  const settings = ['Documentação', 'Sair']
  const { user, signOut } = useContext(AuthContext)

  const handleExit = () => {
    signOut()
  }

  return (
    <div className={styles.main}>
      <div className={styles.perfilContainer}>
        <UserMenu name={user?.name || 'R'}>
          {settings.map((setting) => (
            <MenuItem
              key={setting}
              onClick={() => setting === 'Sair' && handleExit()}
            >
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
        </UserMenu>
      </div>
    </div>
  )
}
