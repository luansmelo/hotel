'use client'

import React, { ChangeEvent, useCallback, useContext, useState } from 'react'
import InputSearch from '@/components/search'
import styles from './styles.module.scss'
import { ProductContext } from '@/context/product'
import ProductCreate from '@/components/product/ProductCreate'
import { ProductProps } from '@/components/product/types'
import AddInputToProduct from '@/components/product/AddInputToProductModal'
import InputProductDetail from '@/components/product/ProductDetail'
import ProductEdit from '@/components/product/ProductEdit'
import { MeasurementUnitContext } from '@/context/measurementUnit'
import { GroupContext } from '@/context/group'
import ConfirmDialog from '@/components/dialog'
import ProductTable from '@/components/product/ProductList'
import { Eye, MoreVertical, PencilRuler, Plus, Trash2 } from 'lucide-react'
import { TableItem } from '@/components/table/types'
import { DropDown } from '@/components/dropDown/'

const Product: React.FC<ProductProps> = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [openModal, setOpenModal] = useState<
    'create' | 'edit' | 'addInput' | 'detail' | 'delete' | null
  >(null)
  const [selectedProduct, setOnProductSelect] = useState<ProductProps>(
    {} as ProductProps
  )
  const [openDialog, setOpenDialog] = useState(false)

  const [anchorEl, setDropdownAnchorEl] = useState<{
    [key: string]: HTMLElement | null
  }>({})

  const handleOpenDropdown = useCallback(
    (event: React.MouseEvent<HTMLElement>, productId: string) => {
      setDropdownAnchorEl((prevAnchors) => ({
        ...prevAnchors,
        [productId]: event.currentTarget,
      }))
    },
    []
  )

  const handleCloseDropdown = (productId: string) => {
    setDropdownAnchorEl((prevAnchors) => ({
      ...prevAnchors,
      [productId]: null,
    }))
  }

  const { loading, productList, handleSave, handleDelete } =
    useContext(ProductContext)
  const { measurementUnitList } = useContext(MeasurementUnitContext)
  const { groupList } = useContext(GroupContext)

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }
  const handleCreateClick = () => {
    setOpenModal('create')
  }

  const handleEditClick = (product: ProductProps) => {
    setOpenModal('edit')
    setOnProductSelect(product)
  }

  const handleAddInputClick = (product: ProductProps) => {
    setOpenModal('addInput')
    setOnProductSelect(product)
  }

  const handleDetailClick = (product: ProductProps) => {
    setOpenModal('detail')
    setOnProductSelect(product)
  }

  const handleDeleteClick = (product: ProductProps) => {
    setOnProductSelect(product)
    setOpenDialog(true)
  }

  const filteredProductList = searchTerm
    ? productList?.filter(
        (input) => input?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : productList

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.searchAndButtonContainer}>
        <InputSearch
          search={'produto'}
          onChange={handleSearchChange}
          disabled={Boolean(openModal)}
        />

        <button
          className={styles.button}
          onClick={handleCreateClick}
          disabled={loading}
        >
          CADASTRAR
        </button>
      </div>

      <ProductTable itemList={filteredProductList}>
        {(product: TableItem) => (
          <DropDown.Trigger
            key={product.id}
            icon={<MoreVertical color="#04B2D9" size={16} />}
            onClick={(e) => handleOpenDropdown(e, product.id)}
          >
            <DropDown.Menu
              anchorEl={anchorEl[product.id]}
              onClose={() => handleCloseDropdown(product.id)}
            >
              <DropDown.Actions>
                <DropDown.Item
                  icon={<Eye color="white" size={20} />}
                  label="visualizar"
                  onClick={() => {
                    handleDetailClick(product as ProductProps)
                    handleCloseDropdown(product.id)
                  }}
                />
                <DropDown.Item
                  icon={<PencilRuler color="white" size={20} />}
                  label="editar"
                  onClick={() => {
                    handleEditClick(product as ProductProps)
                    handleCloseDropdown(product.id)
                  }}
                />
                <DropDown.Item
                  icon={<Plus color="white" size={20} />}
                  label="inserir insumo"
                  onClick={() => {
                    handleAddInputClick(product as ProductProps)
                    handleCloseDropdown(product.id)
                  }}
                />
                <DropDown.Item
                  icon={<Trash2 color="white" size={20} />}
                  label="remover"
                  onClick={() => {
                    handleDeleteClick(product as ProductProps)
                    handleCloseDropdown(product.id)
                  }}
                />
              </DropDown.Actions>
            </DropDown.Menu>
          </DropDown.Trigger>
        )}
      </ProductTable>

      {openModal === 'create' && (
        <ProductCreate
          loading={loading}
          showModal={Boolean(openModal)}
          handleSave={handleSave}
          handleCloseModal={() => setOpenModal(null)}
        />
      )}

      {openModal === 'edit' && (
        <ProductEdit
          isOpen={Boolean(openModal)}
          product={selectedProduct}
          groupList={groupList}
          measurementUnitList={measurementUnitList}
          onClose={() => setOpenModal(null)}
        />
      )}

      {openModal === 'addInput' && (
        <AddInputToProduct
          isOpen={Boolean(openModal)}
          measurementUnitList={measurementUnitList!}
          groupList={groupList}
          product={selectedProduct}
          onClose={() => setOpenModal(null)}
        />
      )}

      {openModal === 'detail' && (
        <InputProductDetail
          product={selectedProduct}
          isOpen={Boolean(openModal)}
          measurementUnitList={measurementUnitList!}
          groupList={groupList}
          onClose={() => setOpenModal(null)}
        />
      )}

      {openDialog && (
        <ConfirmDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onConfirm={() => {
            handleDelete(selectedProduct?.id || '')
            setOpenDialog(false)
          }}
        />
      )}
    </div>
  )
}

export default Product
