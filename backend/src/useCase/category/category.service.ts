import {
  CategoryRepositoryContract,
  CategoryServiceContract,
} from "@/utils/contracts/category-contract";
import { Category } from "@/dto/category/category.dto";
import { NotFoundError } from "@/utils/errors/httpErrors";

export class CategoryService implements CategoryServiceContract {
  constructor(private readonly repository: CategoryRepositoryContract) {}

  async create(input: Category): Promise<void> {
    await this.repository.save(input);
  }

  async getById(id: string): Promise<any> {
    const category = await this.repository.getById(id);

    if (!category) throw new NotFoundError("Categoria não encontrada");
    return category;
  }

  async getAll(): Promise<any> {
    return this.repository.getAll();
  }

  async deleteById(id: string): Promise<void> {
    const category = await this.getById(id);

    await this.repository.deleteById(category.id);
  }

  async updateById(id: string, input: Partial<Category>): Promise<void> {
    await this.getById(id);

    await this.repository.updateById(id, input);
  }
}
