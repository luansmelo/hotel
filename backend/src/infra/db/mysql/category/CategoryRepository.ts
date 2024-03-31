import {
  FindCategoriesParams,
  FindCategoriesResponse,
} from "@/entities/category/FindCategoriesParams";
import { CreateCategoryModel } from "@/entities/category/createCategory";
import Category from "@/data/local/entity/category";
import { CreateCategoryRepository } from "@/data/protocols/db/category/CreateCategoryRepository.protocol";
import { LoadCategoriesRepository } from "@/data/protocols/db/category/LoadCategoriesRepository.protocol";
import { LoadCategoryByNameRepository } from "@/data/protocols/db/category/LoadCategoryByNameRepository.protocol.ts";
import { LoadCategoryByIdRepository } from "@/data/protocols/db/category/LoadCategoryByIdRepository.protocol";
import { DeleteCategoryRepository } from "@/data/protocols/db/category/DeleteCategoryRepository.protocol.ts";
import { UpdateCategoryRepository } from "@/data/protocols/db/category/UpdateCategoryRepository.protocol";
import { CategoryModel } from "@/domain/models/Category";

export class CategoryRepository
  implements
  CreateCategoryRepository,
  LoadCategoriesRepository,
  LoadCategoryByNameRepository,
  LoadCategoryByIdRepository,
  DeleteCategoryRepository,
  UpdateCategoryRepository {

  async create(input: CreateCategoryModel): Promise<CategoryModel> {
    return await Category.create({
      data: input,
    });
  }

  async loadAll(
    findParams: FindCategoriesParams
  ): Promise<FindCategoriesResponse> {
    const page = findParams.page || 1;
    const limit = process.env.PAGE_LIMIT
      ? parseInt(process.env.PAGE_LIMIT)
      : 10;

    const offset = (page - 1) * limit;
    const order = findParams.order || "ASC";
    const sort = findParams.sort || "name";

    const categories = await Category.findMany({
      orderBy: [
        {
          [sort]: order,
        },
      ],
      take: limit,
      skip: offset,
    });

    const totalItems = categories.length;

    return {
      categories,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
    };
  }

  async loadById(id: string): Promise<CategoryModel | null> {
    return Category.findUnique({
      where: { id },
    });
  }

  async loadByName(name: string): Promise<CategoryModel | null> {
    return Category.findFirst({
      where: { name },
    });
  }

  async deleteById(id: string): Promise<CategoryModel> {
    return Category.delete({ where: { id } });
  }

  async updateById(
    id: string,
    input: Partial<CategoryModel>
  ): Promise<CategoryModel> {
    return Category.update({
      where: { id },
      data: input,
    });
  }
}
