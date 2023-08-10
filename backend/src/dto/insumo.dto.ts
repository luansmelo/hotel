export interface InsumoDTO {
  nome: string;
  quantidade_disponivel: string;
  custo: number;
  fornecedor: string;
  data_validade: Date | null;
}
