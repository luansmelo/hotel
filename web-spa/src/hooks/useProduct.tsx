import { useContext, useState, useCallback } from 'react'
import { ProductContext } from '@/context/product'

const useProduct = () => {
  const { loading, productList, handleSave, handleDelete } =
    useContext(ProductContext)

  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showAddInputModal, setShowAddInputModal] = useState(false)
  const [selectedProduct, setOnProductSelect] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value)
  }, [])

  const handleButtonClick = useCallback(() => {
    setShowCreateForm(true)
  }, [])

  const handleOpenDetailsModal = useCallback((product) => {
    setOnProductSelect(product)
    setShowDetailModal(true)
  }, [])

  const handleCloseModals = useCallback(() => {
    setShowCreateForm(false)
    setShowEditModal(false)
    setShowAddInputModal(false)
    setShowDetailModal(false)
  }, [])

  return {
    loading,
    productList,
    handleSave,
    handleDelete,
    searchTerm,
    showCreateForm,
    showEditModal,
    showDetailModal,
    showAddInputModal,
    selectedProduct,
    openDialog,
    handleSearchChange,
    handleButtonClick,
    handleOpenDetailsModal,
    handleCloseModals,
    setOpenDialog,
    setShowEditModal,
    setShowAddInputModal,
  }
}

export default useProduct
