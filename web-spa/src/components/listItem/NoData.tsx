import styles from './styles.module.scss'
import { SearchX } from 'lucide-react'

interface NoDataProps {
  height: number
}

const NoData = ({ height }: NoDataProps) => (
  <span
    className={styles.noData}
    style={{ minHeight: height, maxHeight: height }}
  >
    <SearchX size={80} color="#F56D15" />
  </span>
)

export default NoData
