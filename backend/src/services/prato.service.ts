import { AddInsumoToDish, PratoDTO } from "../dto/prato.dto";
import { ConflictError, NotFoundError } from "../errors/httpErrors";
import { PratoRepository } from "../repositories/pratos.repository";

export class PratoService {
  constructor(private readonly pratoRepository: PratoRepository) {}

  async createDish(payload: PratoDTO) {
    const dish = await this.pratoRepository.getDishByName(payload.nome);

    if (dish) throw new ConflictError("Prato já cadastrado");

    return this.pratoRepository.createDish(payload);
  }

  async getDishs() {
    return this.pratoRepository.getDishs();
  }

  async addInsumoToDish(payload: AddInsumoToDish) {
    const exists = await this.pratoRepository.doesInsumoExistForDish(
      payload.dishId,
      payload.insumoId
    );

    if (exists) throw new ConflictError("Insumo já cadastrado ao prato");

    return this.pratoRepository.addInsumoToDish(payload);
  }

  async getDishWithIngredients(dishId: string) {
    const results = await this.pratoRepository.getDishWithIngredientsData(
      dishId
    );

    if (!results.length) throw new NotFoundError("Prato não encontrado!");

    const dish = {
      id: results[0].dishId,
      nome: results[0].nome,
      description: results[0].description,
      variante: results[0].variante,
      modo_de_preparo: results[0].modo_de_preparo,
      programacao: results[0].programacao,
      insumos: results.map((result) => ({
        id: result.insumoId,
        unidade_associativa: result.unidade_associativa,
        unidade_de_medida: result.unidade_de_medida,
        custo_por_unidade: result.custo_por_unidade,
        fornecedor: result.fornecedor,
        estoque_quantidade: result.estoque_quantidade,
      })),
    };

    return dish;
  }
}
