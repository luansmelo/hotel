import { CategoryRepositoryContract } from "../utils/contracts/category-contract";
import { ProductToCategoryDTO, CategoryDTO } from "../dto/category.dto";
import { Weekdays } from "../utils/enums/weekdays";
import { PrismaClient } from "@prisma/client";

export class CategoryRepository implements CategoryRepositoryContract {
  constructor(private readonly db: PrismaClient) {}
  async save(input: CategoryDTO): Promise<void> {
    await this.db.category.create({
      data: input,
    });
  }

  async getAll(): Promise<any | null> {
    const db = this.db.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return db;
  }
  async getById(id: string): Promise<any | null> {
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

  async addProductToCategory(input: ProductToCategoryDTO): Promise<void> {
    await this.db.categoryProductSchedule.create({
      data: { ...input, weekDay: input.weekDay as Weekdays },
    });
  }

  async getProductInCategory(input: ProductToCategoryDTO): Promise<any> {
    const db = await this.db.categoryProductSchedule.findUnique({
      where: {
        id: input.id,
        categoryId: input.id,
        productId: input.productId,
        weekDay: input.weekDay as Weekdays,
      },
    });

    return db;
  }

  async deleteProduct(input: ProductToCategoryDTO): Promise<void> {
    await this.db.categoryProductSchedule.delete({
      where: {
        id: input.id,
        categoryId: input.categoryId,
        productId: input.productId,
        weekDay: input.weekDay as Weekdays,
      },
    });
  }
}
