'use client'
import './globals.scss'
import { Roboto } from 'next/font/google'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import { ThemeProvider, createTheme } from '@mui/material'
import { AppProvider } from '@/context/AppContext'
import { MapProvider } from '@/context/MapaContext'
import { ProductProvider } from '@/context/ProductContext'
import { InputProvider } from '@/context/InputContext'
import { BusinessProvider } from '@/context/BusinessContext'

config.autoAddCss = false

const inter = Roboto({
  weight: ['400', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

// export const metadata: Metadata = {
//   title: "App",
//   description: "",
// };

const theme = createTheme({
  palette: {
    primary: { main: '#D96262' },
    secondary: { main: '#84A59D', '200': '#D9E3E1' },
  },
})

const FeaturesProvider = ({ children }: { children: React.ReactNode }) => (
  <BusinessProvider>
    <MapProvider>
      <ProductProvider>
        <InputProvider>{children}</InputProvider>
      </ProductProvider>
    </MapProvider>
  </BusinessProvider>
)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <ThemeProvider theme={theme}>
        <AppProvider>
          <FeaturesProvider>
            <body className={inter.className}>{children}</body>
          </FeaturesProvider>
        </AppProvider>
      </ThemeProvider>
    </html>
  )
}
