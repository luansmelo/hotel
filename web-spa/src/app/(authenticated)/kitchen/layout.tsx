// Layout.tsx

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
      <div>
        <Menu />
      </div>

      <div className={styles.mainContainer}>
        <div>
          <Header />
        </div>
        <div className={styles.mainView}>{children}</div>
      </div>
    </main>
  )
}
