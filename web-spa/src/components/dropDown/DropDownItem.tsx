import styles from './styles.module.scss'
import { IconButton, MenuItem, Typography } from '@mui/material'

interface DropDownItemProps {
  label: string
  icon?: React.ReactNode
  disabled?: boolean
  onClick?: () => void
}

const DropDownItem: React.FC<DropDownItemProps> = ({
  icon,
  label,
  disabled,
  onClick,
}) => {
  return (
    <>
      <MenuItem
        className={`${styles.menuItem} ${disabled ? styles.disabledItem : ''}`}
        sx={{
          background: '#30333F',
          width: '300px',
        }}
        onClick={() => {
          if (!disabled && onClick) {
            onClick()
          }
        }}
      >
        {icon && (
          <IconButton
            // className={`${styles.menuItemIcon} ${
            //   disabled ? styles.disabledItemIcon : ''
            // }`}
            color="inherit"
            // onClick={() => {
            //   if (!action.disabled) {
            //     // Você precisa adicionar a lógica desejada aqui
            //   }
            // }}
          >
            {icon}
          </IconButton>
        )}
        <Typography className={styles.menuItemText}>{label}</Typography>
      </MenuItem>
    </>
  )
}

export default DropDownItem
