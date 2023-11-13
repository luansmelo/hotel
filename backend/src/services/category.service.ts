import {
  CategoryRepositoryContract,
  CategoryServiceContract,
} from "../utils/contracts/category-contract";
import { CategoryInput, ProductToCategoryInput } from "../dto/category.dto";
import { NotFoundError } from "../errors/httpErrors";
import { uuid } from "uuidv4";

export class CategoryService implements CategoryServiceContract {
  constructor(private readonly repository: CategoryRepositoryContract) {}
  async create(input: CategoryInput): Promise<void> {
    const data = {
      id: uuid(),
      name: input.name,
      created_at: new Date().toDateString(),
      updated_at: new Date().toDateString(),
    };

    await this.repository.save(data);
  }
  async getById(id: string): Promise<any> {
    const category = await this.repository.getById(id);

    if (!category) {
      throw new NotFoundError("Categoria não encontrada");
    }

    return category;
  }
  async getAll(): Promise<any> {
    return this.repository.getAll();
  }
  async deleteById(id: string): Promise<void> {
    const category = await this.getById(id);

    await this.repository.deleteById(category.id);
  }
  async addProductToCategory(input: ProductToCategoryInput): Promise<void> {
    await this.getById(input.categoryId);

    const data = {
      id: uuid(),
      ...input,
      created_at: new Date().toDateString(),
      updated_at: new Date().toDateString(),
    };

    await this.repository.addProductToCategory(data);
  }

  async deleteProduct(input: ProductToCategoryInput): Promise<void> {
    await this.getById(input.categoryId);

    await this.repository.deleteProduct(input);
  }
}
