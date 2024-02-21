import { CategoryServiceContract } from "@/utils/contracts/category-contract";
import { CategoryInput } from "@/dto/category.dto";

export class CategoryController {
  constructor(private readonly service: CategoryServiceContract) {}

  async create(input: CategoryInput) {
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

  async updateById(id: string, input: CategoryInput) {
    return this.service.updateById(id, input);
  }
}
