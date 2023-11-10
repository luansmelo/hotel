import {
  CategoryRepositoryContract,
  CategoryServiceContract,
} from "../contracts/category-contract";
import { CategoryDTO, ProductToCategoryDTO } from "../dto/category.dto";
import { NotFoundError } from "../errors/httpErrors";

export class CategoryService implements CategoryServiceContract {
  constructor(
    private readonly categoryRepository: CategoryRepositoryContract
  ) {}
  async create(input: CategoryDTO): Promise<void> {
    await this.categoryRepository.save(input);
  }
  async getById(id: string): Promise<any> {
    const category = await this.categoryRepository.getById(id);

    if (!category) {
      throw new NotFoundError("Categoria não encontrada");
    }

    return category;
  }
  async getAll(): Promise<any> {
    return this.categoryRepository.getAll();
  }
  async deleteById(id: string): Promise<void> {
    const category = await this.getById(id);

    await this.categoryRepository.deleteById(category.id);
  }
  async addProductToCategory(input: ProductToCategoryDTO): Promise<void> {
    await this.getById(input.categoryId);

    await this.categoryRepository.addProductToCategory(input);
  }

  async deleteProduct(input: ProductToCategoryDTO): Promise<void> {
    await this.getById(input.categoryId);

    await this.categoryRepository.deleteProduct(input);
  }
}
