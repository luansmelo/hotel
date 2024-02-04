import {
  CategoryRepositoryContract,
  CategoryServiceContract,
} from "../utils/contracts/category-contract";
import {
  CategoryInput,
  ProductCategoryInput,
  ProductToCategoryInput,
} from "../dto/category.dto";
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
  async addProductToCategory(input: ProductCategoryInput): Promise<void> {
    await this.getById(input.categoryId);

    const products = input.product.flatMap(({ productId, weekDay }) => {
      return weekDay.map((day) => ({
        id: uuid(),
        menuId: input.menuId,
        categoryId: input.categoryId,
        productId,
        weekDay: day,
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
      }));
    });

    await this.repository.addProductToCategory(products);
  }

  async deleteProduct(input: ProductToCategoryInput): Promise<void> {
    await this.getById(input.categoryId);

    await this.repository.deleteProduct(input);
  }

  async updateById(id: string, input: CategoryInput): Promise<void> {
    await this.getById(id);

    await this.repository.updateById(id, input);
  }
}
