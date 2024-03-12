import {
  CategoryModel,
  CreateCategory,
  CreateCategoryContract,
  FindCategoryByNameContract,
} from "@/contracts";
import { CreateCategoryModel } from "@/entities/category/createCategory";
import { ConflictError } from "@/utils/errors/httpErrors";

export class CreateCategoryUseCase implements CreateCategory {
  constructor(
    private readonly createCategory: CreateCategoryContract,
    private readonly findCategory: FindCategoryByNameContract
  ) {}

  async create(categoryModel: CreateCategoryModel): Promise<CategoryModel> {
    const category = await this.findCategory.findByName(categoryModel.name);

    if (category) {
      throw new ConflictError("Categoria já cadastrada");
    }

    return this.createCategory.save(categoryModel);
  }
}
