import { InputToProductProps } from '../input/types'

export interface ProductRemoveProps {
  productId: string
  inputId: string
}

export interface InputsOnProducts {
  productId: string
  input: InputToProductProps[]
}

export interface ProductProps {
  id: string
  name: string
  description: string
  inputs: InputToProductProps[]
}

export interface Product {
  id?: string
  name: string
  description: string
  inputs: InputToProductProps[]
}

export interface ProductListProps {
  loading: boolean
  productList: Product[]
  handleDelete: (id: string) => void
  handleSelectProduct: (data: ProductProps) => void
  openEditModal: () => void
  handleDetailModal: () => void
  openAddInputModal: () => void
}

export interface AddInputToProductModalProps {
  isOpen: boolean
  product: ProductProps
  onClose: () => void
}

export interface UpdatedProductInfo {
  productId?: string
  name: string
  description: string
  inputs: UpdatedInputInfo[]
}

export interface UpdatedInputInfo {
  id: string
  grammage: number
  measurementUnit: string
}
