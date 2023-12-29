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
import Image from 'next/image'
import styles from './menu.module.scss'
import MenuButton from '../button/MenuButton'
import { useState } from 'react'
import Separator from '@/components/separator'

const Menu: React.FC = () => {
  const [activeButton, setActiveButton] = useState('')
  const [isMinimized, setIsMinimized] = useState(false)
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
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
        {!isMinimized && (
          <div className={styles.imageContainer}>
            <Image
              src={'/chef-hat.png'}
              alt="Logo"
              width={80}
              height={80}
              quality={100}
              layout="intrinsic"
            />
          </div>
        )}
        <Separator />
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
            text="Menu"
            selectedFeature="menu"
            active={activeButton === 'menu'}
            onClick={() => setActiveButton('menu')}
            isMinimized={isMinimized}
          />
          <MenuButton
            Icon={Microwave}
            text="Mapa de Produção"
            selectedFeature="mapa-de-producao"
            active={activeButton === 'mapa-de-menu'}
            onClick={() => setActiveButton('mapa-de-menu')}
            isMinimized={isMinimized}
          />
          <MenuButton
            Icon={Soup}
            text="Ficha Técnica"
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
  )
}

export default Menu
