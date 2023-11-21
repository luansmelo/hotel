'use client'
import { Apple, Microwave, PanelTop, Soup } from 'lucide-react'
import Image from '../../atoms/Image'
import styles from './menu.module.scss'
import MenuButton from '../button/MenuButton'
import { useState } from 'react'

const Menu: React.FC = () => {
  const [activeButton, setActiveButton] = useState('')

  return (
    <div className={styles.menuContainer}>
      <div className={styles.main}>
        <div className={styles.imageContainer}>
          <Image src={'/chef-hat.png'} alt="Logo" width={75} height={75} />
          <p>App</p>
          <hr />
        </div>
        <div className={styles.menuButtonContainer}>
          <MenuButton
            Icon={PanelTop}
            text="Menu"
            selectedFeature="mapa-de-menu"
            active={activeButton === 'mapa-de-menu'}
            onClick={() => setActiveButton('mapa-de-menu')}
          />
          <MenuButton
            Icon={Microwave}
            text="Mapa de Produção"
            selectedFeature="mapa-de-producao"
            active={activeButton === 'mapa-de-menu'}
            onClick={() => setActiveButton('mapa-de-menu')}
          />
          <MenuButton
            Icon={Soup}
            text="Ficha Técnica"
            selectedFeature="product"
            active={activeButton === 'product'}
            onClick={() => setActiveButton('product')}
          />
          <MenuButton
            Icon={Apple}
            text="Insumos"
            selectedFeature="input"
            active={activeButton === 'input'}
            onClick={() => setActiveButton('input')}
          />
        </div>
      </div>
    </div>
  )
}

export default Menu
