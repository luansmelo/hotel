import { Search } from 'lucide-react'
import styles from './styles.module.scss'
import { ChangeEvent } from 'react'

interface InputSearchProps {
  search: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function InputSearch({ search, onChange }: InputSearchProps) {
  return (
    <div className={styles.inputCointainer}>
      <Search size={24} color="#84A59D" />
      <input placeholder={`Buscar o nome do ${search}`} onChange={onChange} />
    </div>
  )
}
