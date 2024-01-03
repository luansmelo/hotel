import '@fortawesome/fontawesome-svg-core/styles.css'
import Header from '@/components/atoms/MenuHeader/Header'
import styles from '@/app/page.module.css'
import Menu from '@/components/menu/Menu'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main className={styles.main}>
      <Header />

      <div className={styles.contentAndTopBar}>
        <Menu />

        <div className={styles.content}>{children}</div>
      </div>
    </main>
  )
}
