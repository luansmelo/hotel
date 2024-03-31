
import { CreateCategoryRepository } from "@/data/protocols/db/category/CreateCategoryRepository.protocol";
import { LoadCategoryByNameRepository } from "@/data/protocols/db/category/LoadCategoryByNameRepository.protocol.ts";
import { CategoryModel } from "@/domain/models/Category";
import { CreateCategoryUseCaseContract } from "@/domain/usecases/category/CreateCategory";
import { CreateCategoryModel } from "@/entities/category/createCategory";
import { CategoryAlreadyExistsError } from "@/presentation/errors/CategoryAlreadyExistsError";

export class CreateCategoryUseCase implements CreateCategoryUseCaseContract {
  constructor(
    private readonly createCategory: CreateCategoryRepository,
    private readonly findCategory: LoadCategoryByNameRepository
  ) {}

  async create(categoryModel: CreateCategoryModel): Promise<CategoryModel> {
    const category = await this.findCategory.loadByName(categoryModel.name);

    if (category) {
      throw new CategoryAlreadyExistsError("Categoria já cadastrada");
    }

    return this.createCategory.create(categoryModel);
  }
}
