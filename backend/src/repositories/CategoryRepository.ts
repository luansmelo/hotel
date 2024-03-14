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
import { PrismaClient } from "@prisma/client";

export class CategoryRepository
  implements
  CreateCategoryContract,
  FindCategoriesContract,
  FindCategoryByNameContract,
  FindCategoryByIdContract,
  DeleteCategoryContract,
  UpdateCategoryContract {
  constructor(private readonly db: PrismaClient) { }

  async save(input: CreateCategoryModel): Promise<CategoryModel> {
    return await this.db.category.create({
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

    const categories = await this.db.category.findMany({
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
    return this.db.category.findUnique({
      where: { id },
    });
  }

  async findByName(name: string): Promise<CategoryModel | null> {
    return this.db.category.findFirst({
      where: { name },
    });
  }

  async deleteById(id: string): Promise<CategoryModel> {
    return this.db.category.delete({ where: { id } });
  }

  async updateById(
    id: string,
    input: Partial<CategoryModel>
  ): Promise<CategoryModel> {
    return this.db.category.update({
      where: { id },
      data: input,
    });
  }
}
