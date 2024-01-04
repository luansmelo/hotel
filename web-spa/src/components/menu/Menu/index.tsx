'use client'
import {
  Apple,
  Home,
  Microwave,
  PanelTop,
  Soup,
  Upload,
  ChevronRightCircle,
  ChevronLeftCircle,
} from 'lucide-react'
import styles from './menu.module.scss'
import MenuButton from '../button/MenuButton'
import { useState } from 'react'
import { Fade } from '@mui/material'

const Menu: React.FC = () => {
  const [activeButton, setActiveButton] = useState('')
  const [isMinimized, setIsMinimized] = useState(false)
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <Fade in={true} timeout={500} unmountOnExit>
      <div
        className={`${styles.menuContainer} ${isMinimized && styles.minimized}`}
      >
        <div className={styles.main}>
          <div onClick={toggleMinimize} className={styles.mainButton}>
            {isMinimized ? (
              <ChevronRightCircle size={18} />
            ) : (
              <ChevronLeftCircle size={18} />
            )}
          </div>

          <div className={styles.menuButtonContainer}>
            <MenuButton
              Icon={Home}
              text="Inicio"
              selectedFeature="/"
              active={activeButton === 'home'}
              onClick={() => setActiveButton('home')}
              isMinimized={isMinimized}
            />
            <MenuButton
              Icon={PanelTop}
              text="Mapa de menu"
              selectedFeature="menu"
              active={activeButton === 'menu'}
              onClick={() => setActiveButton('menu')}
              isMinimized={isMinimized}
            />
            <MenuButton
              Icon={Microwave}
              text="Mapa de produção"
              selectedFeature="mapProduction"
              active={activeButton === 'mapProduction'}
              onClick={() => setActiveButton('mapProduction')}
              isMinimized={isMinimized}
            />
            <MenuButton
              Icon={Soup}
              text="Ficha técnica"
              selectedFeature="product"
              active={activeButton === 'product'}
              onClick={() => setActiveButton('product')}
              isMinimized={isMinimized}
            />
            <MenuButton
              Icon={Apple}
              text="Insumos"
              selectedFeature="input"
              active={activeButton === 'input'}
              onClick={() => setActiveButton('input')}
              isMinimized={isMinimized}
            />
            <MenuButton
              Icon={Upload}
              text="Upload"
              selectedFeature="upload"
              active={activeButton === 'upload'}
              onClick={() => setActiveButton('upload')}
              isMinimized={isMinimized}
            />
          </div>
        </div>
      </div>
    </Fade>
  )
}

export default Menu
