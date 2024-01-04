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
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Sua Página Título Aqui</title>
        <meta name="description" content="Sua descrição da página aqui." />
      </head>
      <body className={inter.className}>
        <ToastContainer />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
