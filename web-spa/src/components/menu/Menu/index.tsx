'use client'
import React, { useState } from 'react'
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
import SubMenu from './SubMenu'
import { Fade } from '@mui/material'

const Menu: React.FC = () => {
  const [activeButton, setActiveButton] = useState('')
  const [activeSubMenuButton, setActiveSubMenuButton] = useState('')
  const [isMinimized, setIsMinimized] = useState(false)
  const [showSubMenu, setShowSubMenu] = useState(false)
  const [menuButtonCoordinates, setMenuButtonCoordinates] = useState({
    x: 0,
    y: 0,
  })

  const toggleSubMenu = (event: React.MouseEvent) => {
    setMenuButtonCoordinates({
      x: event.clientX,
      y: event.clientY,
    })
    setShowSubMenu(!showSubMenu)
  }

  const toggleMinimize = () => setIsMinimized(!isMinimized)

  const handleSubMenuClick = (feature: string) =>
    setActiveSubMenuButton(feature)

  const menuButtons = [
    { Icon: Home, text: 'Inicio', feature: '/' },
    { Icon: Boxes, text: 'Grupo', feature: 'group' },
    {
      Icon: PencilRuler,
      text: 'Unidade de medida',
      feature: 'measurementUnit',
    },
    { Icon: Apple, text: 'Insumo', feature: 'input' },
    { Icon: Soup, text: 'Ficha técnica', feature: 'product' },
    { Icon: PencilRuler, text: 'Categoria', feature: 'category' },
    { Icon: PanelTop, text: 'Menu', feature: 'menu' },
    { Icon: Microwave, text: 'Mapa de produção', feature: 'mapProduction' },
  ]

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
            {menuButtons.map(({ Icon, text, feature }) => (
              <MenuButton
                key={feature}
                Icon={Icon}
                text={text}
                selectedFeature={feature}
                active={activeButton === feature}
                onClick={(event) => {
                  setActiveButton(feature)
                  if (feature === 'menu') toggleSubMenu(event)
                }}
                isMinimized={isMinimized}
              />
            ))}
            {showSubMenu && (
              <SubMenu
                activeSubMenuButton={activeSubMenuButton}
                handleSubMenuClick={handleSubMenuClick}
                coordinates={menuButtonCoordinates}
              />
            )}
          </div>
        </div>
      </div>
    </Fade>
  )
}

export default Menu
