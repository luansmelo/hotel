import {
  CategoryModel,
  CreateCategoryContract,
  DeleteCategoryContract,
  FindCategoriesContract,
  FindCategoryByIdContract,
  FindCategoryByNameContract,
  UpdateCategoryContract,
} from "@/contracts";
import {
  FindCategoriesParams,
  FindCategoriesResponse,
} from "@/entities/category/FindCategoriesParams";
import { CreateCategoryModel } from "@/entities/category/createCategory";
import Category from "@/models/category";

export class CategoryRepository
  implements
  CreateCategoryContract,
  FindCategoriesContract,
  FindCategoryByNameContract,
  FindCategoryByIdContract,
  DeleteCategoryContract,
  UpdateCategoryContract {

  async save(input: CreateCategoryModel): Promise<CategoryModel> {
    return await Category.create({
      data: input,
    });
  }

  async findAll(
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

  async findById(id: string): Promise<CategoryModel | null> {
    return Category.findUnique({
      where: { id },
    });
  }

  async findByName(name: string): Promise<CategoryModel | null> {
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
