import {
  CategoryModel,
  CreateCategoryContract,
  DeleteCategoryContract,
  FindCategoriesContract,
  FindCategoryByIdContract,
  FindCategoryByNameContract,
  UpdateCategoryContract,
} from "@/contracts";
import { CreateCategoryModel } from "@/entities/category/createCategory";
import { PrismaClient } from "@prisma/client";

export class CategoryRepository
  implements
    CreateCategoryContract,
    FindCategoriesContract,
    FindCategoryByNameContract,
    FindCategoryByIdContract,
    DeleteCategoryContract,
    UpdateCategoryContract
{
  constructor(private readonly db: PrismaClient) {}

  async save(input: CreateCategoryModel): Promise<CategoryModel> {
    return await this.db.category.create({
      data: input,
    });
  }

  async findAll(): Promise<CategoryModel[] | null> {
    const db = this.db.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return db;
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
