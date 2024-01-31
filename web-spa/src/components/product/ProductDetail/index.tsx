'use client'
import { useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { ProductContext } from '@/context/product'
import { Hypnosis } from 'react-cssfx-loading'
import { AddInputToProductModalProps } from '../types'
import Modal from '@/components/modal/Modal'
import CustomTextArea from '@/components/customTextArea'
import Image from 'next/image'
import TableHeader from '@/components/atoms/TableHeader'
import { TABLE_HEADERS_PRODUCT_DETAILS } from '@/constants/tableHeader'
import { Fade } from '@mui/material'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function InputProductDetailModal({
  isOpen,
  product,
  onClose,
}: AddInputToProductModalProps) {
  const { loading, productDetail, handleProductDetails } =
    useContext(ProductContext)
  const [showInputDetails, setShowInputDetails] = useState(false)

  const fetchProductDetails = async () => {
    try {
      await handleProductDetails(product.id)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProductDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClose = () => {
    onClose()
  }

  const calculateTotalCost = () => {
    return productDetail?.inputs
      ?.reduce((totalCost: number, input: any) => {
        const validUnitPrice = Number(input.unitPrice)
        return isNaN(validUnitPrice) ? totalCost : totalCost + validUnitPrice
      }, 0)
      .toFixed(2)
  }

  const calculateTotalGrams = () => {
    return productDetail?.inputs?.reduce((totalGrams: number, input: any) => {
      const validGrams = Number(input.grammage)
      return isNaN(validGrams) ? totalGrams : totalGrams + validGrams
    }, 0)
  }

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className={styles.modalProductContainer}>
        {loading ? (
          <Hypnosis color="var(--color-primary)" />
        ) : (
          <div className={styles.EditWrapper}>
            <div className={styles.inputListSearch}>
              <div>
                <p>{product.name}</p>
              </div>
            </div>

            <div className={styles.containerWrapper}>
              <div className={styles.imageContainer}>
                <Image
                  src="https://bakeandcakegourmet.com.br/uploads/site/receitas/strogonoff-de-frango-6xp9zh2o.jpg"
                  alt={product.name}
                  width={290}
                  height={235}
                  className={styles.image}
                />
              </div>
              <div className={styles.textAreaContainer}>
                <CustomTextArea value={productDetail.description} rows={12} />
              </div>
            </div>
            <hr />
            <div className={styles.inputList}>
              <p onClick={() => setShowInputDetails(!showInputDetails)}>
                Visualizar Lista de Insumos{' '}
                {showInputDetails ? (
                  <ChevronDown color="#F56D15" />
                ) : (
                  <ChevronUp color="#F56D15" />
                )}
              </p>
              <Fade in={showInputDetails}>
                <div>
                  <div className={styles.containerWrapper}>
                    <table className={styles.table}>
                      <TableHeader headers={TABLE_HEADERS_PRODUCT_DETAILS} />

                      <div className={styles.tbodyContainer}>
                        <tbody className={styles.tbody}>
                          {productDetail?.inputs?.map((input: any) => (
                            <tr key={input.id} className={styles.tr}>
                              <td>{input.name}</td>
                              <td>
                                {input.grammage} {input.measurementUnit}
                              </td>
                              <td>{input.unitPrice}</td>
                              <td>{input.unitPrice}</td>
                            </tr>
                          ))}
                        </tbody>
                      </div>
                    </table>
                  </div>
                </div>
              </Fade>
            </div>
            <hr />
            <div>
              <p>
                Total Custo:
                <span className={styles.currency}>R$</span>{' '}
                {calculateTotalCost()}
              </p>
              <p>
                Preço Sugerido:
                <span className={styles.currency}>R$</span>{' '}
                {calculateTotalCost()}
              </p>
              <p>
                Volume do prato:
                <span className={styles.currency}></span>{' '}
                {calculateTotalGrams()} KG
              </p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
