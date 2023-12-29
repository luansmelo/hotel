'use client'
import { IProductInputResponse } from '@/atom/business'
import styles from './styles.module.scss'
import { Eye } from 'lucide-react'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import { useContext } from 'react'
import { MenuContext } from '@/context/menu'
import { ProductInputProps } from '@/components/product/types'

interface ITableProductsProps {
  onClickView?: (product?: ProductInputProps) => void
  onClickDelete?: () => void
  headColor?: string
  removeEye?: boolean
}

export default function ProductListTable({
  headColor,
  onClickView,
  removeEye,
}: ITableProductsProps) {
  const { loading, menuProductList } = useContext(MenuContext)

  if (loading) {
    return <div>loading</div>
  }

  const AccordionProductItem = (product: ProductInputProps) => {
    return (
      <tr className={styles.tr} key={product.name} style={{ width: '100%' }}>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>
          {!removeEye && (
            <div
              className={styles.productActionView}
              onClick={() => onClickView && onClickView(product)}
            >
              <Eye color="#D96262" size={18} />
            </div>
          )}
        </td>
      </tr>
    )
  }

  const AccordionProductItemDetails = (inputList: IProductInputResponse[]) => {
    return (
      <div style={{ width: '100%' }}>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <thead className={styles.thead2} style={{ width: '100%' }}>
            <tr
              style={{
                background: '#F8BDBD',
                color: '#ffffff',
                width: '100%',
              }}
            >
              <td style={{ color: headColor ? '#ffffff' : '#000' }}>Código</td>
              <td style={{ color: headColor ? '#ffffff' : '#000' }}>Nome</td>
              <td style={{ color: headColor ? '#ffffff' : '#000' }}>
                Preço Unitário
              </td>
              <td style={{ color: headColor ? '#ffffff' : '#000' }}>Grupo</td>
              <td style={{ color: headColor ? '#ffffff' : '#000' }}>
                Unidade Medida
              </td>
            </tr>
          </thead>
          <div>
            {inputList?.map((input) => (
              <div key={input.inputId}>{input.productInputName}</div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr
            style={{
              background: headColor,
              color: headColor ? '#ffffff' : '#000',
            }}
          >
            <td style={{ color: headColor ? '#ffffff' : '#000' }}>Nome</td>
            <td style={{ color: headColor ? '#ffffff' : '#000' }}>Custo</td>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {menuProductList?.map((product, index) => (
            <div key={index}>
              <Accordion
                sx={{
                  '& .MuiAccordionSummary-root': {
                    padding: 'unset',
                  },
                }}
              >
                <AccordionSummary
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                  sx={{
                    '& .MuiAccordionSummary-content ': {
                      margin: 'unset',
                    },
                  }}
                >
                  <AccordionProductItem
                    id={product.product.id}
                    name={product.product.name}
                    description={product.product.description}
                  />
                </AccordionSummary>
                <AccordionDetails>
                  {AccordionProductItemDetails(product.productInputs)}
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
        </tbody>
      </table>
    </>
  )
}
