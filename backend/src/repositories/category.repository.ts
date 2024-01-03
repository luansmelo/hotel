import { CategoryRepositoryContract } from "../utils/contracts/category-contract";
import {
  ProductToCategoryInput,
  CategoryContract,
  ProductToCategoryContract,
  ProductCategoryContract,
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

  async addProductToCategory(input: ProductCategoryContract[]): Promise<void> {
    await this.db.categoryProductSchedule.createMany({
      data: input.map((item) => ({
        id: item.id,
        menuId: item.menuId,
        categoryId: item.categoryId,
        productId: item.productId,
        weekDay: item.weekDay,
        created_at: item.created_at,
        updated_at: item.updated_at,
      })),
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
    console.log(input);
    await this.db.categoryProductSchedule.deleteMany({
      where: {
        menuId: input.id,
        categoryId: input.categoryId,
        productId: input.productId,
        weekDay: input.weekDay,
      },
    });
  }
}
