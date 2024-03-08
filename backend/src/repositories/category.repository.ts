import { CategoryRepositoryContract } from "@/utils/contracts/category-contract";
import {
  ProductToCategoryInput,
  ProductToCategoryContract,
  Category,
} from "@/dto/category/category.dto";
import { Weekdays } from "@/utils/enums/weekdays";
import { PrismaClient } from "@prisma/client";

export class CategoryRepository implements CategoryRepositoryContract {
  constructor(private readonly db: PrismaClient) {}

  async save(input: Category): Promise<void> {
    await this.db.category.create({
      data: input,
    });
  }

  async getAll(): Promise<Category[] | null> {
    const db = this.db.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return db;
  }

  async getById(id: string): Promise<Category | null> {
    return this.db.category.findUnique({
      where: { id },
      include: {
        categoryProductSchedule: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async deleteById(id: string): Promise<void> {
    await this.db.category.delete({ where: { id } });
  }

  async getProductInCategory(
    input: ProductToCategoryInput
  ): Promise<ProductToCategoryContract | null> {
    const db = await this.db.categoryProductSchedule.findUnique({
      where: {
        id: input.menuId,
        categoryId: input.categoryId,
        productId: input.productId,
        weekDay: Weekdays[input.weekDay],
      },
    });

    return db;
  }

  async updateById(id: string, input: Partial<Category>): Promise<void> {
    await this.db.category.update({
      where: { id },
      data: input,
    });
  }
}
