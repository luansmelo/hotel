'use client'

import Menu from '@/components/menu/Menu'
import Header from '@/components/header/Header'

import ProductList from '@/feature/products/Products'
import CreateProduct from '@/feature/productCreate/createProduct'
import ProductDetails from '@/feature/productDetails/productDetails'

import { FEATURES, useAppContext } from '@/context/AppContext'
import ProductionMap from '@/feature/mapProduction/ProductionMap'

import Login from '@/feature/login'
import MenuMap from '@/feature/mapMenu/MenuMap'

import styles from './page.module.css'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import RegisterFeature from '@/feature/register'
import Inputs from '@/feature/inputs'

export default function Home() {
  const { currentFeature } = useAppContext()

  const FeatureView = () => {
    switch (currentFeature) {
      case FEATURES.LOGIN:
        return <Login />
      case FEATURES.REGISTER:
        return <RegisterFeature />
      case FEATURES.PRODUCTS:
        return <ProductList />
      case FEATURES.PRODUCTION_MAP:
        return <ProductionMap />
      case FEATURES.PRODUCT_DETAILS:
        return <ProductDetails />
      case FEATURES.INPUTS:
        return <Inputs />
      case FEATURES.CREATE_PRODUCT:
        return <CreateProduct />
      case FEATURES.MENU_MAP:
        return <MenuMap />
      default:
        return <h1>404</h1>
    }
  }

  const isRegistersOrLogin =
    currentFeature === FEATURES.LOGIN || currentFeature === FEATURES.REGISTER

  return (
    <main className={styles.main}>
      <ToastContainer />
      {isRegistersOrLogin ? (
        <FeatureView />
      ) : (
        <>
          <div>
            <Menu />
          </div>

          <div className={styles.mainContainer}>
            <div className={styles.headerView}>
              <Header />
            </div>

            <div className={styles.mainView}>
              <FeatureView />
            </div>
          </div>
        </>
      )}
    </main>
  )
}
