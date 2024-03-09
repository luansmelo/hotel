import { CategoryServiceContract } from "@/utils/contracts/category-contract";
import { Category } from "@/dto/category/category.dto";

export class CategoryController {
  constructor(private readonly service: CategoryServiceContract) {}

  async create(input: Category) {
    return this.service.create(input);
  }

  async getAll() {
    return this.service.getAll();
  }

  async getById(id: string) {
    return this.service.getById(id);
  }

  async deleteById(id: string) {
    return this.service.deleteById(id);
  }

  async updateById(id: string, input: Category) {
    return this.service.updateById(id, input);
  }
}
