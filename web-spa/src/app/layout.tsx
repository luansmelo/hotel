'use client'

import './globals.scss'
import { Roboto } from 'next/font/google'
import { Providers } from '@/providers/providers'
import { ToastContainer } from 'react-toastify'

const inter = Roboto({
  weight: ['400', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <ToastContainer />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
