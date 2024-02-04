export const INPUT_COLUMNS = [
  {
    id: 'nome',
    label: 'Nome',
  },
  {
    id: 'preço unitário',
    label: 'Preço Unitário',
  },
  {
    id: 'unidade de medida',
    label: 'Unidade de Medida',
  },
  {
    id: 'código',
    label: 'Código',
  },
  {
    id: 'grupo',
    label: 'Grupo',
  },
]

export const INPUT_MANIPULATION_COLUMNS = [
  {
    id: 'nome',
    label: 'Nome',
    minWidth: '240px',
  },
  {
    id: 'unidade de medida',
    label: 'Unidade de Medida',
    minWidth: '250px',
  },
  {
    id: 'quantidade',
    label: 'Quantidade',
    minWidth: '250px',
  },
]

export const PRODUCT_DETAILS_COLUMNS = [
  {
    id: 'descrição',
    label: 'Descrição',
  },
  {
    id: 'quantidade',
    label: 'Quantidade',
  },
  {
    id: 'custo médio',
    label: 'Custo Médio',
  },
]

export const TABLE_HEADERS_INPUT_DETAILS = [
  'Nome',
  'Unidade de Medida',
  'Gramatura',
]

export interface Type {
  id: string
  label: string
  width: string
  align: 'center' | 'left' | 'right' | 'inherit' | 'justify' | undefined
}

export const PRODUCT_COLUMNS: Type[] = [
  {
    id: 'nome',
    label: 'Nome',
    width: '20%',
    align: 'left',
  },
  {
    id: 'descrição',
    label: 'Descrição',
    width: '60%',
    align: 'left',
  },
  {
    id: 'actions',
    label: '',
    width: '20%',
    align: 'right',
  },
]

export const CATEGORY_COLUMNS = [
  {
    id: 'nome',
    label: 'Nome',
  },
]
