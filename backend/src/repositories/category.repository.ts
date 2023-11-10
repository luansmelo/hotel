import prisma from "../database";
import { CategoryRepositoryContract } from "../contracts/category-contract";
import { AddProductToCategoryDTO, CategoryDTO } from "../dto/category.dto";
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
    const db = prisma.category.findUnique({ where: { id } });

    return db;
  }

  async addProductToCategory(input: AddProductToCategoryDTO): Promise<void> {
    await prisma.categoryProductSchedule.create({
      data: { ...input, weekDay: input.weekDay as Weekdays },
    });
  }

  async deleteById(id: string): Promise<void> {
    await prisma.category.delete({ where: { id } });
  }
}
