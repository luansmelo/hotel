'use client'

import React, { ChangeEvent, useContext, useState } from 'react'
import InputSearch from '@/components/atoms/search'
import styles from './styles.module.scss'
import { ProductContext } from '@/context/product'
import ProductCreate from '@/components/product/ProductCreate'
import { ProductProps } from '@/components/product/types'
import AddInputToProduct from '@/components/product/AddInputToProductModal'
import InputProductDetail from '@/components/product/ProductDetail'
import ProductEdit from '@/components/product/ProductEdit'
import { MeasurementUnitContext } from '@/context/measurementUnit'
import { GroupContext } from '@/context/grupo'
import ListItem, { FieldDefinition } from '@/components/listItem/Index'
import { Eye, PencilRuler, Plus, Trash2 } from 'lucide-react'
import { Action } from '@/components/listItem/types'
import ConfirmDialog from '@/components/dialog'
import { TABLE_HEADERS_PRODUCT } from '@/constants/tableHeader'

const Product: React.FC<ProductProps> = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showAddInputModal, setShowAddInputModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<ProductProps>(
    {} as ProductProps
  )
  const [openDialog, setOpenDialog] = useState(false)

  const { loading, productList, handleSave, handleDelete } =
    useContext(ProductContext)
  const { measurementUnitList } = useContext(MeasurementUnitContext)
  const { groupList } = useContext(GroupContext)

  const dynamicFields: FieldDefinition<ProductProps>[] = [
    {
      key: 'name',
      render: (item) => <span>{item.name}</span>,
    },
  ]

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const openEditModal = () => {
    setShowEditModal(true)
  }

  const openAddInputModal = () => {
    setShowAddInputModal(true)
  }

  const handleButtonClick = () => {
    setShowCreateForm(true)
  }

  const handleSelectedProduct = (product: ProductProps) => {
    setSelectedProduct(product)
  }

  const handleDetailModal = () => {
    setShowDetailModal(true)
  }

  const openDeleteModal = () => {
    setOpenDialog(true)
  }

  const filteredProductList = searchTerm
    ? productList?.filter(
        (input) => input?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : productList

  const actions: Action<ProductProps>[] = [
    {
      label: 'Detalhes',
      onClick: (item) => {
        setSelectedProduct(item)
        handleDetailModal()
      },
      icon: <Eye color="#fff" size={20} />,
      actionClass: 'visualizar',
    },
    {
      label: 'Editar',
      onClick: (item) => {
        setSelectedProduct(item)
        openEditModal()
      },
      icon: <PencilRuler color="#fff" size={20} />,
      actionClass: 'editar',
    },
    {
      label: 'Adicionar insumo',
      onClick: (item) => {
        setSelectedProduct(item)
        openAddInputModal()
      },
      icon: <Plus color="#fff" size={20} />,
      actionClass: 'adicionar',
    },
    {
      label: 'Excluir',
      onClick: (item) => {
        openDeleteModal()
        handleSelectedProduct(item)
      },
      icon: <Trash2 color="#fff" size={20} />,
      actionClass: 'excluir',
    },
  ]

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.searchAndButtonContainer}>
        <InputSearch
          search={'produto'}
          onChange={handleSearchChange}
          disabled={showCreateForm}
        />

        <button
          className={styles.button}
          onClick={handleButtonClick}
          disabled={loading}
        >
          CADASTRAR
        </button>
      </div>

      <div>
        <ListItem
          loading={loading}
          itemList={filteredProductList}
          headers={TABLE_HEADERS_PRODUCT}
          actions={actions}
          dynamicFields={dynamicFields}
        />
      </div>

      {showCreateForm && (
        <ProductCreate
          loading={loading}
          showModal={showCreateForm}
          handleSave={handleSave}
          handleCloseModal={() => setShowCreateForm(false)}
        />
      )}

      {showEditModal && (
        <ProductEdit
          isOpen={showEditModal}
          product={selectedProduct}
          groupList={groupList}
          measurementUnitList={measurementUnitList}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {showAddInputModal && (
        <AddInputToProduct
          isOpen={showAddInputModal}
          measurementUnitList={measurementUnitList}
          groupList={groupList}
          product={selectedProduct}
          onClose={() => setShowAddInputModal(false)}
        />
      )}

      {showDetailModal && (
        <InputProductDetail
          product={selectedProduct}
          isOpen={showDetailModal}
          measurementUnitList={measurementUnitList}
          groupList={groupList}
          onClose={() => setShowDetailModal(false)}
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
