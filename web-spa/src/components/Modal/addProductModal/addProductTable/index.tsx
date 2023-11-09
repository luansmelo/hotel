'use client'
import { IProductProps } from '@/atom/business'
import styles from './styles.module.scss'

import { Checkbox } from '@mui/material'

interface ITableProductsProps {
  productData: IProductProps[]
}
export default function AddProductTable({ productData }: ITableProductsProps) {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  return (
    <>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <td>Name</td>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {productData.map((product) => {
            return (
              <tr className={styles.tr} key={product.name}>
                <td>{product.name}</td>
                <td>
                  <Checkbox {...label} size="medium" />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
