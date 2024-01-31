import React from 'react'
import styles from './menu.module.scss'
import { Microwave } from 'lucide-react'

const SubMenu: React.FC<{
  activeSubMenuButton: string
  handleSubMenuClick: (feature: string) => void
  coordinates: { x: number; y: number }
}> = ({ activeSubMenuButton, handleSubMenuClick, coordinates }) => (
  <div
    className={styles.subMenu}
    style={{ top: coordinates.y, left: coordinates.x }}
  >
    <SubMenuButton
      icon={<Microwave size={18} />}
      label="Cadastrar Menu"
      feature="cadastrarMenu"
      activeSubMenuButton={activeSubMenuButton}
      onClick={handleSubMenuClick}
    />
    <SubMenuButton
      icon={<Microwave size={18} />}
      label="Adicionar Produto a Categoria"
      feature="adicionarProduto"
      activeSubMenuButton={activeSubMenuButton}
      onClick={handleSubMenuClick}
    />
    <SubMenuButton
      icon={<Microwave size={18} />}
      label="Adicionar Categoria ao Menu"
      feature="adicionarCategoria"
      activeSubMenuButton={activeSubMenuButton}
      onClick={handleSubMenuClick}
    />
  </div>
)

const SubMenuButton: React.FC<{
  icon: React.ReactNode
  label: string
  feature: string
  activeSubMenuButton: string
  onClick: (feature: string) => void
}> = ({ icon, label, feature, activeSubMenuButton, onClick }) => (
  <div
    className={`${styles.subMenuButton} ${
      activeSubMenuButton === feature && styles.active
    }`}
    onClick={() => onClick(feature)}
  >
    <div className={styles.subMenuButtonIcon}>{icon}</div>
    <div className={styles.subMenuButtonLabel}>{label}</div>
  </div>
)

export default SubMenu
