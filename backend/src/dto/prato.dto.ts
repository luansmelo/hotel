export interface PratoDTO {
  nome: string;
  description: string;
  variante: string;
  modo_de_preparo?: string;
}

export interface AddInsumoToDish {
  dishId: string;
  insumoId: string;
  quantidade: number;
}
