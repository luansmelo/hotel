'use client'
import { IProductResponse } from '@/atom/business'
import styles from './styles.module.scss'

import AddButton from '@/components/addButton'
import { Hypnosis } from 'react-cssfx-loading'
import { useMapContext } from '@/context/MapaContext'
import { useBusinessContext } from '@/context/BusinessContext'
import { SearchX } from 'lucide-react'
import { useContext } from 'react'
import { CategoryContext } from '@/context/category'

interface ITableProductsProps {
  weekDay: string
  categoryId: string
  productData: IProductResponse[]
}
export default function AddProductTable({
  productData,
  weekDay,
  categoryId,
}: ITableProductsProps) {
  const { isLoading } = useMapContext()
  const { handleProductAddCategory } = useContext(CategoryContext)

  const handleClickAddProduct = (product: IProductResponse) => {
    const data = {
      categoryId: categoryId || '',
      productId: product.id || '',
      weekDay: weekDay || '',
    }

    product.id && handleProductAddCategory(data)
  }

  return (
    <>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <td>Name</td>
          </tr>
        </thead>
        {isLoading ? (
          <div
            style={{
              width: '100%',
              height: '260px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Hypnosis color="#F28482" />
          </div>
        ) : (
          <>
            {productData.length == 0 ? (
              <div
                style={{
                  width: '100%',
                  height: '260px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <SearchX size={80} color="#D96262" />
              </div>
            ) : (
              <>
                <tbody
                  className={styles.tbody}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {productData.map((product) => {
                    return (
                      <tr className={styles.tr} key={product.name}>
                        <td>{product.name}</td>
                        <td className={styles.tdButton}>
                          <AddButton
                            text="Adicionar Produto"
                            onClickButton={() => handleClickAddProduct(product)}
                          />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </>
            )}
          </>
        )}
      </table>
    </>
  )
}
