import { AddInputToDish, DishDTO } from "../dto/dish.dto";
import { ConflictError, NotFoundError } from "../errors/httpErrors";
import { DishRepository } from "../repositories/dishs.repository";

export class DishService {
  constructor(private readonly dishRepository: DishRepository) {}

  async createDish(payload: DishDTO) {
    const dish = await this.dishRepository.getDishByName(payload.name);

    if (dish) throw new ConflictError("Prato já cadastrado");

    return this.dishRepository.createDish(payload);
  }

  async getDishs() {
    return this.dishRepository.getDishs();
  }

  async addInputToDish(payload: AddInputToDish) {
    const exists = await this.dishRepository.doesInputExistForDish(
      payload.dishId,
      payload.inputId
    );

    if (exists) throw new ConflictError("Insumo já cadastrado ao prato");

    return this.dishRepository.addInputToDish(payload);
  }

  async getDishWithIngredients(dishId: string) {
    const results = await this.dishRepository.getDishWithIngredientsData(
      dishId
    );

    if (!results.length) throw new NotFoundError("Prato não encontrado!");

    const dish = {
      id: results[0].dishId,
      nome: results[0].name,
      description: results[0].description,
      variante: results[0].variant,
      modo_de_preparo: results[0].method_preparation,
      programacao: results[0].programming,
      insumos: results.map((result) => ({
        id: result.inputId,
        unidade_associativa: result.associative_unit,
        unidade_de_medida: result.unit_measurement,
        custo_por_unidade: result.cost_per_unit,
        fornecedor: result.supplier,
        // estoque_quantidade: result.estoque_quantidade,
      })),
    };

    return dish;
  }
}
