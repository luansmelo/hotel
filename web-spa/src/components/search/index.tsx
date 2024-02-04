import { Search } from 'lucide-react'
import styles from './styles.module.scss'
import { ChangeEvent } from 'react'

interface InputSearchProps {
  search: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}

export default function InputSearch({
  search,
  onChange,
  disabled,
}: InputSearchProps) {
  return (
    <div className={styles.inputCointainer}>
      <Search size={20} color="#BDBDBD" />
      <input
        placeholder={`Buscar ${search}`}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  )
}
