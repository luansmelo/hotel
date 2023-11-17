'use-client'
import { Apple, Microwave, PanelTop, Soup } from 'lucide-react'
import MenuButton from './button/MenuButton'
import styles from './menu.module.css'
import Image from 'next/image'

export default function Menu() {
  return (
    <div className={styles.menuContainer}>
      <div className={styles.main}>
        <div className={styles.imageContainer}>
          <Image src={'/chef-hat.png'} alt="Logo" width={110} height={110} />
          <p>App</p>
          <hr />
        </div>
        <div className={styles.menuButtonContainer}>
          <MenuButton Icon={PanelTop} text="Mapa de Menu" active={false} />
          <MenuButton Icon={Microwave} text="Mapa de Produção" active={false} />
          <MenuButton Icon={Soup} text="Produtos" active={false} />
          <MenuButton Icon={Apple} text="Insumos" active={true} />
        </div>
      </div>
    </div>
  )
}
