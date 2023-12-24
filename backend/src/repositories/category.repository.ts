import { CategoryRepositoryContract } from "../utils/contracts/category-contract";
import {
  ProductToCategoryInput,
  CategoryContract,
  ProductToCategoryContract,
} from "../dto/category.dto";
import { Weekdays } from "../utils/enums/weekdays";
import { PrismaClient } from "@prisma/client";

export class CategoryRepository implements CategoryRepositoryContract {
  constructor(private readonly db: PrismaClient) {}
  async save(input: CategoryContract): Promise<void> {
    await this.db.category.create({
      data: input,
    });
  }
  async getAll(): Promise<CategoryContract[] | null> {
    const db = this.db.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return db;
  }
  async getById(id: string): Promise<CategoryContract | null> {
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
  async addProductToCategory(input: ProductToCategoryContract): Promise<void> {
    await this.db.categoryProductSchedule.create({
      data: { ...input, weekDay: Weekdays[input.weekDay] },
    });
  }
  async getProductInCategory(
    input: ProductToCategoryInput
  ): Promise<ProductToCategoryContract | null> {
    const db = await this.db.categoryProductSchedule.findUnique({
      where: {
        id: input.id,
        categoryId: input.id,
        productId: input.productId,
        weekDay: Weekdays[input.weekDay],
      },
    });

    return db;
  }
  async deleteProduct(input: ProductToCategoryInput): Promise<void> {
    await this.db.categoryProductSchedule.delete({
      where: {
        id: input.id,
        categoryId: input.categoryId,
        productId: input.productId,
        weekDay: Weekdays[input.weekDay],
      },
    });
  }
}
