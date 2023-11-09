'use client'
import { IProductResponse } from '@/atom/business'
import styles from './styles.module.scss'
import { Eye, Trash2 } from 'lucide-react'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import Inputs from '@/feature/inputs'
import { useMapContext } from '@/context/MapaContext'

interface ITableProductsProps {
  productData: IProductResponse[]
  onClickView?: (product?: IProductResponse) => void
  onClickDelete?: () => void
  headColor?: string
  removeEye?: boolean
}

export default function ProductListTable({
  headColor,
  productData,
  onClickDelete,
  onClickView,
  removeEye,
}: ITableProductsProps) {
  const { isLoading } = useMapContext()

  if (isLoading) {
    return <div>loading</div>
  }

  const AccordionProductItem = (product: IProductResponse) => {
    return (
      <tr className={styles.tr} key={product.name} style={{ width: '100%' }}>
        <td>{product.name}</td>
        <td>{product.productDescription}</td>
        <td>
          {!removeEye && (
            <div
              className={styles.productActionView}
              onClick={() => onClickView && onClickView(product)}
            >
              <Eye color="#D96262" size={18} />
            </div>
          )}
          <div className={styles.productActionDelete} onClick={onClickDelete}>
            <Trash2 color="white" size={18} />
          </div>
        </td>
      </tr>
    )
  }

  const AccordionProductItemDetails = () => {
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
            <Inputs hideHeader hideTableHeader />
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
          {productData?.map((product, index) => (
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
                    id={product.id}
                    name={product.name}
                    productDescription={product.productDescription}
                  />
                </AccordionSummary>
                <AccordionDetails>
                  <AccordionProductItemDetails />
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
        </tbody>
      </table>
    </>
  )
}
