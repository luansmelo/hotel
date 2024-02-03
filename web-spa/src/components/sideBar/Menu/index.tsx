'use client'
import {
  Apple,
  Home,
  Microwave,
  PanelTop,
  Soup,
  ChevronRightCircle,
  ChevronLeftCircle,
  Boxes,
  PencilRuler,
} from 'lucide-react'
import styles from './menu.module.scss'
import MenuButton from '../button/MenuButton'
import { useState } from 'react'
import { Fade } from '@mui/material'

const SideBar: React.FC = () => {
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
              Icon={Boxes}
              text="Grupo"
              selectedFeature="group"
              active={activeButton === 'group'}
              onClick={() => setActiveButton('group')}
              isMinimized={isMinimized}
            />
            <MenuButton
              Icon={PencilRuler}
              text="Unidade de medida"
              selectedFeature="measurementUnit"
              active={activeButton === 'measurementUnit'}
              onClick={() => setActiveButton('measurementUnit')}
              isMinimized={isMinimized}
            />
            <MenuButton
              Icon={Apple}
              text="Insumo"
              selectedFeature="input"
              active={activeButton === 'input'}
              onClick={() => setActiveButton('input')}
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
              Icon={PencilRuler}
              text="Categoria"
              selectedFeature="category"
              active={activeButton === 'category'}
              onClick={() => setActiveButton('category')}
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
          </div>
        </div>
      </div>
    </Fade>
  )
}

export default SideBar
