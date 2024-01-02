'use client'
import { Fade } from '@mui/material'
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
import ListItem from '@/components/listItem/Index'
import { Eye, PencilRuler, Plus, Trash2 } from 'lucide-react'
import { Action } from '@/components/listItem/types'
import ConfirmDialog from '@/components/dialog'

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

  const hasResults = filteredProductList?.length > 0

  const actions: Action<ProductProps>[] = [
    {
      label: 'Editar',
      onClick: (item) => {
        setSelectedProduct(item)
        openEditModal()
      },
      icon: <PencilRuler color="#fff" size={20} />,
    },
    {
      label: 'Excluir',
      onClick: (item) => {
        openDeleteModal()
        handleSelectedProduct(item)
      },
      icon: <Trash2 color="#fff" size={20} />,
    },
    {
      label: 'Detalhes',
      onClick: (item) => {
        setSelectedProduct(item)
        handleDetailModal()
      },
      icon: <Eye color="#fff" size={20} />,
    },
    {
      label: 'Adicionar insumo',
      onClick: (item) => {
        setSelectedProduct(item)
        openAddInputModal()
      },
      icon: <Plus color="#fff" size={20} />,
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
          dynamicFields={['name']}
          headers={['Produtos']}
          itemList={filteredProductList}
          actions={actions}
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

      <div className={styles.textContainer}>
        <div>
          {!hasResults && !searchTerm && <p>Nenhum produto cadastrado.</p>}
        </div>

        <div>
          {!hasResults && searchTerm && (
            <Fade in={!showCreateForm} timeout={500}>
              <p>Produto não encontrado</p>
            </Fade>
          )}
        </div>
      </div>
    </div>
  )
}

export default Product
