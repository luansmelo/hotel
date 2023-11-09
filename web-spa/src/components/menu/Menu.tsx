'use-client'
import { Apple, Microwave, PanelTop, Soup } from 'lucide-react'
import MenuButton from './button/MenuButton'
import styles from './menu.module.css'
import Image from 'next/image'
import { FEATURES, useAppContext } from '@/context/AppContext'

export default function Menu() {
  const { currentFeature, setCurrentFeature } = useAppContext()

  return (
    <div className={styles.menuContainer}>
      <div className={styles.main}>
        <div className={styles.imageContainer}>
          <Image src={'/chef-hat.png'} alt="Logo" width={110} height={110} />
          <p>App</p>
          <hr />
        </div>
        <div className={styles.menuButtonContainer}>
          <MenuButton
            Icon={PanelTop}
            text="Mapa de Menu"
            active={currentFeature === FEATURES.MENU_MAP}
            onClickMenuButton={() => setCurrentFeature(FEATURES.MENU_MAP)}
            selectedFeature={FEATURES.MENU_MAP}
          />
          <MenuButton
            Icon={Microwave}
            text="Mapa de Produção"
            active={currentFeature === FEATURES.PRODUCTION_MAP}
            onClickMenuButton={() => setCurrentFeature(FEATURES.PRODUCTION_MAP)}
            selectedFeature={FEATURES.PRODUCTION_MAP}
          />
          <MenuButton
            Icon={Soup}
            text="Produtos"
            active={currentFeature === FEATURES.PRODUCTS}
            onClickMenuButton={() => setCurrentFeature(FEATURES.PRODUCTS)}
            selectedFeature={FEATURES.PRODUCTS}
          />
          <MenuButton
            Icon={Apple}
            text="Insumos"
            active={currentFeature === FEATURES.INPUTS}
            onClickMenuButton={() => setCurrentFeature(FEATURES.INPUTS)}
            selectedFeature={FEATURES.INPUTS}
          />
        </div>
      </div>
    </div>
  )
}
