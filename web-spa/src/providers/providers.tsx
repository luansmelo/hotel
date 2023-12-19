'use client'

import { BusinessProvider } from '@/context/BusinessContext'
import { InputProvider } from '@/context/input'
import { MapProvider } from '@/context/MapaContext'
import { ProductProvider } from '@/context/product'
import { AuthProvider } from '@/context/auth'
import { ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: { main: '#D96262' },
    secondary: { main: '#84A59D', '200': '#D9E3E1' },
  },
})

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <BusinessProvider>
        <MapProvider>
          <ProductProvider>
            <InputProvider>{children}</InputProvider>
          </ProductProvider>
        </MapProvider>
      </BusinessProvider>
    </AuthProvider>
  </ThemeProvider>
)
