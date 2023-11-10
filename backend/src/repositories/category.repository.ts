import prisma from "../database";
import { CategoryRepositoryContract } from "../contracts/category-contract";
import { ProductToCategoryDTO, CategoryDTO } from "../dto/category.dto";
import { Weekdays } from "../utils/enums/weekdays";

export class CategoryRepository implements CategoryRepositoryContract {
  async save(input: CategoryDTO): Promise<void> {
    await prisma.category.create({
      data: input,
    });
  }

  async getAll(): Promise<any> {
    const db = prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return db;
  }
  async getById(id: string): Promise<any> {
    const db = await prisma.category.findUnique({
      where: { id },
      include: {
        categoryProductSchedule: {
          include: {
            product: true,
          },
        },
      },
    });

    return {
      id: db?.id,
      name: db?.name,
      products: db?.categoryProductSchedule?.map((item) => ({
        weekDay: item?.weekDay as Weekdays,
        product: item?.product,
      })),
    };
  }

  async deleteById(id: string): Promise<void> {
    await prisma.category.delete({ where: { id } });
  }

  async addProductToCategory(input: ProductToCategoryDTO): Promise<void> {
    await prisma.categoryProductSchedule.create({
      data: { ...input, weekDay: input.weekDay as Weekdays },
    });
  }

  async deleteProduct(input: ProductToCategoryDTO): Promise<void> {
    await prisma.categoryProductSchedule.delete({
      where: {
        id: input.id,
        categoryId: input.categoryId,
        productId: input.productId,
        weekDay: input.weekDay as Weekdays,
      },
    });
  }
}
