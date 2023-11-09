'use client'
import { IInputsProps, IProductProps } from '@/atom/business'
import styles from './styles.module.scss'
import { Eye, Trash2 } from 'lucide-react'
import ProductModal from '../Modal/productModal'
import { useState } from 'react'

interface ITableProductsProps {
  data: IInputsProps[]
  onClickView?: (product?: IProductProps) => void
  onClickDelete?: () => void
}
export default function TableInputsDetails({
  data,
  onClickDelete,
  onClickView,
}: ITableProductsProps) {
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <td>Code</td>
            <td>Nome</td>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {data.map((Input) => {
            return (
              <tr className={styles.tr}>
                <td>{Input.code}</td>
                <td>{Input.name}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
