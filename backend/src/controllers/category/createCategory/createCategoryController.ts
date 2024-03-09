import { CreateCategory } from "@/contracts/category";
import { CreateCategoryModel } from "@/entities/category/createCategory";

export class CreateCategoryController {
  constructor(private readonly saveCategory: CreateCategory) {}

  async create(input: CreateCategoryModel) {
    return this.saveCategory.create(input);
  }
}
