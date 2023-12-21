'use client'
import { Fade } from '@mui/material'
import { ChangeEvent, useContext, useState } from 'react'
import InputSearch from '@/components/atoms/search'
import styles from './styles.module.scss'
import { ProductContext } from '@/context/product'
import ProductList from '@/components/product/ProductList'
import ProductCreate from '@/components/product/ProductCreate'
import { Product, ProductProps } from '@/components/product/types'
import AddInputToProduct from '@/components/product/AddInputToProductModal'
import InputProductDetail from '@/components/product/ProductDetail'

export default function Product() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showAddInputModal, setShowAddInputModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<ProductProps>(
    {} as ProductProps
  )

  const { loading, productList, handleSave, handleDelete } =
    useContext(ProductContext)

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

  const filteredProductList = searchTerm
    ? productList?.filter(
        (input) => input?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : productList

  const hasResults = filteredProductList?.length > 0

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
        <ProductList
          loading={loading}
          productList={filteredProductList}
          openEditModal={openEditModal}
          handleSelectProduct={handleSelectedProduct}
          handleDelete={handleDelete}
          openAddInputModal={openAddInputModal}
          handleDetailModal={handleDetailModal}
        />
      </div>

      {showCreateForm && (
        <ProductCreate
          loading={loading}
          showModal={showCreateForm}
          errors={{}}
          setErrors={() => {}}
          handleSave={handleSave}
          handleCloseModal={() => setShowCreateForm(false)}
        />
      )}

      {showAddInputModal && (
        <AddInputToProduct
          isOpen={showAddInputModal}
          product={selectedProduct}
          onClose={() => setShowAddInputModal(false)}
        />
      )}

      {showDetailModal && (
        <InputProductDetail
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          product={selectedProduct}
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
