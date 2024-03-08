import { AddProductRepositoryModal, MenuProduct } from "@/dto/menu/menu.dto";
import { MenuModal, MenuProductInput } from "@/dto/menu/menu.dto";
import { MenuRepositoryContract } from "@/utils/contracts/menu-contract";
import { PrismaClient } from "@prisma/client";

export class MenuRepository implements MenuRepositoryContract {
  constructor(private readonly db: PrismaClient) {}

  async save(input: MenuModal): Promise<MenuModal> {
    return this.db.menu.create({
      data: input,
    });
  }

  async getById(id: string): Promise<MenuModal | null> {
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

  async deleteProduct(input: MenuProduct): Promise<void> {
    await this.db.categoryProductSchedule.deleteMany({
      where: {
        menuId: input.menuId,
        categoryId: input.categoryId,
        productId: input.productId,
        weekDay: input.weekDay,
      },
    });
  }

  async addProduct(input: AddProductRepositoryModal[]): Promise<void> {
    await this.db.categoryProductSchedule.createMany({
      data: input.map((item) => ({
        id: item.id,
        menuId: item.menuId,
        categoryId: item.categoryId,
        productId: item.productId,
        weekDay: item.weekDay,
      })),
    });
  }

  async deleteById(id: string): Promise<MenuModal> {
    return this.db.menu.delete({
      where: { id },
    });
  }

  async updateById(id: string, name: string): Promise<void> {
    await this.db.menu.update({
      where: { id },
      data: {
        name,
        categoryProductSchedule: {},
      },
    });
  }
}
