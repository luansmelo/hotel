import '@fortawesome/fontawesome-svg-core/styles.css'
import Header from '@/components/atoms/MenuHeader/Header'
import styles from '@/app/page.module.css'
import SideBar from '@/components/sideBar'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main className={styles.main}>
      <div className={styles.contentAndTopBar}>
        <SideBar />

        <div className={styles.content}>{children}</div>
      </div>
    </main>
  )
}
