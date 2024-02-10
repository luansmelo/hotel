import {
  CategoryRepositoryContract,
  CategoryServiceContract,
} from "../utils/contracts/category-contract";
import { CategoryInput } from "../dto/category.dto";
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

  async updateById(id: string, input: CategoryInput): Promise<void> {
    await this.getById(id);

    await this.repository.updateById(id, input);
  }
}
