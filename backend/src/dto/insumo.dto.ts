export interface InsumoDTO {
  nome: string;
  quantidade: number;
  unidade_associativa?: string; 
  unidade_de_medida?: number;
  custo_por_unidade?: number;
  fornecedor?: string;
}
