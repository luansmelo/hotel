import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const initialValue = {
  current: 'Padaria',
}

export const businessAtom = atomWithStorage('business-key', initialValue)

export interface IMenuResponse {
  id: string
  name: string
}

interface IOpenModalProduct {
  title: string
  editOpen: boolean
  isOpen: boolean
  productData: IProductProps
}
export const initialOpenProductModal: IOpenModalProduct = {
  title: '',
  editOpen: false,
  isOpen: false,
  productData: {
    code: '',
    name: '',
    group: '',
    kcal: 0,
    unitPrice: 0,
    inputList: [],
  },
}
export const openProductModal = atom(initialOpenProductModal)

export interface IProductInputsResponse {
  Id: string
  ProductId: string
  InputId: string
  ProductInputName: string
  ProductInputPrice: number
  ProductInputQtty: number
  ProductInputMeasurementUnit: string
}

export interface IInputsProps {
  code: number
  name: string
  averagePax: number
  unitPrice: number
  kcal: number
}

export interface InputContract {
  id?: string
  name: string
  code: string
  unitPrice: number
  measurementUnit: string
  group: string
}

export interface IProductProps {
  code: string
  name: string
  group: string
  unitPrice: number
  kcal: number
  inputList: IInputsProps[]
}

export interface IProductResponse {
  id?: string
  name: string
  productDescription: string
}

export interface IProductInputResponse {
  productId: string
  inputId: string
  productInputName: string
  productInputMeasurementUnit: string
  productInputGroup: string
  productInputUnitPrice: number
  productInputQtty: number
}

export interface IProductInputDataResponse {
  product: IProductResponse
  productInputs: IProductInputResponse[]
}

export interface IBusinessProps {
  current: string
  businessList: string[]
}

const pizzariaIsumos = [
  {
    code: 101,
    name: 'Farinha',
    averagePax: 1.5,
    unitPrice: 0.5,
    kcal: 150,
  },
  {
    code: 102,
    name: 'Molho de Tomate',
    averagePax: 1.5,
    unitPrice: 0.3,
    kcal: 50,
  },
  {
    code: 103,
    name: 'Queijo Mozarela',
    averagePax: 1.5,
    unitPrice: 0.7,
    kcal: 250,
  },
  {
    code: 204,
    name: 'Pepperoni',
    averagePax: 1.5,
    unitPrice: 0.6,
    kcal: 200,
  },
  {
    code: 304,
    name: 'Pimentão',
    averagePax: 1.5,
    unitPrice: 0.4,
    kcal: 30,
  },
  {
    code: 305,
    name: 'Cogumelos',
    averagePax: 1.5,
    unitPrice: 0.6,
    kcal: 40,
  },
]
const pizzariaPratos = [
  {
    code: 100,
    name: 'Pizza Margherita',
    group: '',
    unitPrice: 0,
    kcal: 0,
    inputList: [...pizzariaIsumos.slice(0, 1), pizzariaIsumos[2]],
  },
  {
    code: 101,
    name: 'Pizza Pepperoni',
    group: '',
    unitPrice: 0,
    kcal: 0,
    inputList: [...pizzariaIsumos.slice(0, 1), pizzariaIsumos[3]],
  },
  {
    code: 102,
    name: 'Pizza Vegetariana',
    group: '',
    unitPrice: 0,
    kcal: 0,
    inputList: [...pizzariaIsumos.slice(0, 1), pizzariaIsumos[4]],
  },
]

const padariaInsumos = [
  {
    code: 201,
    name: 'Farinha de Trigo',
    averagePax: 1.0,
    unitPrice: 1.0,
    kcal: 300,
  },
  {
    code: 202,
    name: 'Açúcar',
    averagePax: 1.0,
    unitPrice: 0.5,
    kcal: 200,
  },
  {
    code: 203,
    name: 'Fermento Biológico',
    averagePax: 0.2,
    unitPrice: 0.2,
    kcal: 50,
  },
  {
    code: 206,
    name: 'Ovos',
    averagePax: 0.5,
    unitPrice: 0.4,
    kcal: 60,
  },
  {
    code: 207,
    name: 'Leite',
    averagePax: 0.3,
    unitPrice: 0.6,
    kcal: 70,
  },
  {
    code: 208,
    name: 'Manteiga',
    averagePax: 0.1,
    unitPrice: 0.8,
    kcal: 120,
  },
]
const padariaPratos = [
  {
    code: 101,
    name: 'Bolo',
    group: '',
    unitPrice: 0,
    kcal: 0,
    inputList: [...padariaInsumos.slice(0, 1), padariaInsumos[2]],
  },
  {
    code: 102,
    name: 'Pão',
    group: '',
    unitPrice: 0,
    kcal: 0,
    inputList: [...padariaInsumos.slice(0, 1), padariaInsumos[3]],
  },
  {
    code: 103,
    name: 'Mini Pão Hamburguer',
    group: '',
    unitPrice: 0,
    kcal: 0,
    inputList: [...padariaInsumos.slice(0, 1), padariaInsumos[4]],
  },
]

const restauranteInsumos = [
  {
    code: 301,
    name: 'Peito de Frango',
    averagePax: 0.3,
    unitPrice: 2.5,
    kcal: 150,
  },
  {
    code: 302,
    name: 'Arroz',
    averagePax: 0.2,
    unitPrice: 0.4,
    kcal: 100,
  },
  {
    code: 303,
    name: 'Feijão Preto',
    averagePax: 0.2,
    unitPrice: 0.6,
    kcal: 80,
  },
  {
    code: 304,
    name: 'Legumes Mistos',
    averagePax: 0.3,
    unitPrice: 1.0,
    kcal: 50,
  },
  {
    code: 305,
    name: 'Salada Verde',
    averagePax: 0.2,
    unitPrice: 0.8,
    kcal: 30,
  },
]
const restaurantePratos = [
  {
    code: 101,
    name: 'Macarrão',
    group: '',
    unitPrice: 0,
    kcal: 0,
    inputList: [...restauranteInsumos.slice(0, 1), restauranteInsumos[2]],
  },
  {
    code: 102,
    name: 'Lasanha',
    group: '',
    unitPrice: 0,
    kcal: 0,
    inputList: [...restauranteInsumos.slice(0, 1), restauranteInsumos[3]],
  },
  {
    code: 103,
    name: 'Strogonoff de Carne',
    group: '',
    unitPrice: 0,
    kcal: 0,
    inputList: [...restauranteInsumos.slice(0, 1), restauranteInsumos[4]],
  },
]

export const AllProduct = [
  ...restaurantePratos,
  ...pizzariaPratos,
  ...padariaPratos,
]

interface MockDefaultType {
  [key: string]: {
    inputs: IInputsProps[]
    products: IProductProps[]
  }
}

export const mockDefault: MockDefaultType = {
  Padaria: {
    inputs: padariaInsumos,
    products: padariaPratos,
  },

  Restaurante: {
    inputs: restauranteInsumos,
    products: restaurantePratos,
  },

  Pizzaria: {
    inputs: pizzariaIsumos,
    products: pizzariaPratos,
  },
}

export const mockDefaultAtom = atomWithStorage('mock-default-key', mockDefault)
export const businessSelectedAtom = atom(mockDefault['Padaria'])
