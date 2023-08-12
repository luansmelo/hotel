import { Knex } from "knex";
import { CategoryDTO } from "../dto/categoria.dto";

export class CategoryRepository {
  private static category: string = "category";
  constructor(private readonly database: Knex<any, unknown[]>) {}

  async createCategory(data: CategoryDTO) {
    await this.database(CategoryRepository.category).insert({
      ...data,
    });
  }

  async getCategorys() {
    const category = this.database(CategoryRepository.category);

    return category;
  }

  async getCategoryByName(nome: string) {
    const [category] = await this.database(
      CategoryRepository.category
    ).whereRaw("LOWER(nome) = ?", nome.toLowerCase());

    return category;
  }
}
