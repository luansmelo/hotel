'use client'
import { IProductResponse } from '@/atom/business'
import styles from './styles.module.scss'

import AddButton from '@/components/addButton'
import { Hypnosis } from 'react-cssfx-loading'
import { SearchX, Trash2 } from 'lucide-react'
import { CategoryProps, ProductOnCategory } from '@/utils/interfaces/category'

interface ITableProductsProps {
  weekDay: string
  category: CategoryProps
  onDelete: (productId: string) => void
  handleProductAddCategory: (input: ProductOnCategory) => Promise<void>
  productData: IProductResponse[]
}
export default function AddProductTable({
  productData,
  weekDay,
  category,
  onDelete,
  handleProductAddCategory,
}: ITableProductsProps) {
  const isLoading = false
  const handleClickAddProduct = (product: IProductResponse) => {
    const data = {
      menuId: category.menuId || '',
      categoryId: category.id || '',
    }

    product.id && handleProductAddCategory(data)
  }

  return (
    <>
      <table className={styles.table}>
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
                          <div onClick={() => onDelete(product.id!)}>
                            <Trash2 size={20} color="#D96262" />
                          </div>
                        </td>
                      </tr>
                    )!
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
