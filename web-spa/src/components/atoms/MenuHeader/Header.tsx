'use client'
import { useContext } from 'react'
import { Typography, MenuItem } from '@mui/material'
import { AuthContext } from '@/context/auth'
import UserMenu from '@/components/userMenu'
import styles from './styles.module.scss'
import cookies from 'js-cookie'
import Image from 'next/image'
import Logo from '../../../../public/chef-hat.png'
export default function Header() {
  const settings = ['Documentação', 'Sair']
  const { signOut } = useContext(AuthContext)

  const user = cookies.get('user')
  const parsedUser = user ? JSON.parse(user) : null

  const handleExit = () => {
    signOut()
  }

  return (
    <div className={styles.main}>
      {/* <div className={styles.img}>
        <Image
          src={Logo}
          alt="Logo"
          width={48}
          height={48}
          quality={1}
          placeholder="blur"
        />
      </div> */}
      <div className={styles.perfilContainer}>
        <UserMenu name={parsedUser?.name || 'R'}>
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
