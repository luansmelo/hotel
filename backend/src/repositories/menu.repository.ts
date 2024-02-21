import {
  ProductCategoryContract,
  ProductToCategoryInput,
} from "@/dto/category.dto";
import { MenuContract, MenuProductInput } from "@/dto/menu.dto";
import { MenuRepositoryContract } from "@/utils/contracts/menu-contract";
import { PrismaClient } from "@prisma/client";

export class MenuRepository implements MenuRepositoryContract {
  constructor(private readonly db: PrismaClient) {}

  async save(input: MenuContract): Promise<MenuContract> {
    return this.db.menu.create({
      data: input,
    });
  }

  async getById(id: string): Promise<MenuContract | null> {
    const db = await this.db.menu.findUnique({
      where: {
        id,
      },
    });

    return db;
  }

  async getSelectedMenu(input: MenuProductInput): Promise<any | null> {
    return this.db.menu.findFirst({
      where: {
        id: input.menuId,
      },
      include: {
        categoryProductSchedule: {
          where: {
            categoryId: input.categoryId,
            weekDay: input.day,
          },
          include: {
            category: {
              include: {
                categoryProductSchedule: {
                  select: {
                    weekDay: true,
                    product: {
                      select: {
                        id: true,
                        name: true,
                        description: true,
                        inputs: {
                          select: {
                            id: true,
                            input: true,
                            grammage: true,
                            measurementUnit: true,
                          },
                        },
                      },
                    },
                  },
                  where: {
                    weekDay: input.day,
                    categoryId: input.categoryId,
                    menuId: input.menuId,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async getList(): Promise<any> {
    return this.db.menu.findMany({
      include: {
        categoryProductSchedule: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async deleteProduct(input: ProductToCategoryInput): Promise<void> {
    await this.db.categoryProductSchedule.deleteMany({
      where: {
        menuId: input.menuId,
        categoryId: input.categoryId,
        productId: input.productId,
        weekDay: input.weekDay,
      },
    });
  }

  async addProduct(input: ProductCategoryContract[]): Promise<void> {
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

  async deleteById(id: string): Promise<MenuContract> {
    return this.db.menu.delete({
      where: { id },
    });
  }

  async update(id: string, name: string): Promise<void> {
    await this.db.menu.update({
      where: { id },
      data: {
        name,
        categoryProductSchedule: {},
      },
    });
  }
}
