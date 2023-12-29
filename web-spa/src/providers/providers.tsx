'use client'

import { BusinessProvider } from '@/context/BusinessContext'
import { InputProvider } from '@/context/input'
import { ProductProvider } from '@/context/product'
import { AuthProvider } from '@/context/auth'
import { ThemeProvider, createTheme } from '@mui/material'
import { MenuProvider } from '@/context/menu'
import { CategoryProvider } from '@/context/category'
import { MeasurementUnitProvider } from '@/context/measurementUnit'

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
        <MenuProvider>
          <CategoryProvider>
            <ProductProvider>
              <InputProvider>
                <MeasurementUnitProvider>{children}</MeasurementUnitProvider>
              </InputProvider>
            </ProductProvider>
          </CategoryProvider>
        </MenuProvider>
      </BusinessProvider>
    </AuthProvider>
  </ThemeProvider>
)
