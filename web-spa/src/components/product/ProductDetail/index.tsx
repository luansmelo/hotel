'use client'
import { useContext, useEffect } from 'react'
import styles from './styles.module.scss'
import { ProductContext } from '@/context/product'
import { Hypnosis } from 'react-cssfx-loading'
import { AddInputToProductModalProps } from '../types'
import Modal from '@/components/modal/Modal'
import CustomTextArea from '@/components/customTextArea'
import Image from 'next/image'

interface ConversionTable {
  [unit: string]: {
    [targetUnit: string]: number
  }
}

const conversionTable: ConversionTable = {
  KG: {
    GRAMAS: 1000,
  },
  LITRO: {
    MILILITRO: 1000,
  },
  // Adicione mais conversões conforme necessário
}

import InputTableDetail from './InputTableDetail'

export default function InputProductDetailModal({
  isOpen,
  product,
  onClose,
}: AddInputToProductModalProps) {
  const { loading, productDetail, handleProductDetails } =
    useContext(ProductContext)

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

  const convertUnit = (
    value: number,
    fromUnit: string,
    toUnit: string
  ): number => {
    if (conversionTable[fromUnit] && conversionTable[fromUnit][toUnit]) {
      return value * conversionTable[fromUnit][toUnit]
    } else {
      console.error(`Conversão de ${fromUnit} para ${toUnit} não suportada.`)
      return value
    }
  }

  const calculateTotalCost = () => {
    return productDetail?.inputs
      ?.reduce((totalCost: number, input: any) => {
        const validUnitPrice = Number(input.unitPrice)
        const convertedUnitPrice = convertUnit(
          validUnitPrice,
          input.unit,
          'GRAMAS'
        )
        return isNaN(convertedUnitPrice)
          ? totalCost
          : totalCost + convertedUnitPrice
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
                  width={260}
                  height={200}
                  className={styles.image}
                />
              </div>
              <div className={styles.textAreaContainer}>
                <CustomTextArea value={productDetail.description} rows={10} />
              </div>
            </div>
            <hr />
            <InputTableDetail
              itemList={productDetail?.inputs}
              itemsPerPage={5}
            />
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
