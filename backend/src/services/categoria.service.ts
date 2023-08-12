import { CategoryDTO } from "../dto/categoria.dto";
import { ConflictError } from "../errors/httpErrors";
import { CategoryRepository } from "../repositories/categorias.repository";

export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async createCategory(payload: CategoryDTO) {
    const category = await this.categoryRepository.getCategoryByName(
      payload.nome
    );

    if (category) {
      throw new ConflictError("categoria já cadastrada.");
    }

    return this.categoryRepository.createCategory(payload);
  }

  async getCategory() {
    return this.categoryRepository.getCategorys();
  }
}
