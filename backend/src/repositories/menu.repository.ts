import prisma from "../database";
import { AddCategoryToMenuDTO, MenuDTO, MenuProductDTO } from "../dto/menu.dto";
import { MenuRepositoryContract } from "../contracts/menu-contract";
import { Weekdays } from "../utils/enums/weekdays";

export class MenuRepository implements MenuRepositoryContract {
  async save(input: MenuDTO): Promise<void> {
    await prisma.menu.create({
      data: input,
    });
  }

  async getById(id: string): Promise<any> {
    const db = await prisma.menu.findUnique({
      where: {
        id,
      },
      include: {
        category: {
          include: {
            categoryProductSchedule: {
              include: {
                product: {
                  include: {
                    inputs: {
                      include: {
                        input: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return db;
  }

  async getSelectedMenu(input: MenuProductDTO): Promise<any> {
    const menus = await prisma.menu.findMany({
      where: {
        id: input.menuId ? { equals: input.menuId } : undefined,
        category: {
          categoryProductSchedule: {
            some: {
              weekDay: input.day ? { equals: input.day } : undefined,
              categoryId: input.categoryId
                ? { equals: input.categoryId }
                : undefined,
            },
          },
        },
      },
      include: {
        category: {
          include: {
            categoryProductSchedule: {
              where: {
                weekDay: input.day ? { equals: input.day } : undefined,
              },
              include: {
                product: {
                  include: {
                    inputs: {
                      include: {
                        input: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return menus.map((menu) => {
      return {
        id: menu.id,
        name: menu.name,
        categoryId: menu.categoryId,
        data: menu.category?.categoryProductSchedule.map((item) => {
          return {
            weekDay: item?.weekDay as Weekdays,
            products: {
              id: item?.product.id,
              name: item?.product.name,
            },
          };
        }),
      };
    });
  }

  async getList(): Promise<any> {
    const db = await prisma.menu.findMany();
    return db;
  }

  async addCategoryToMenu(input: AddCategoryToMenuDTO): Promise<void> {
    await prisma.menu.update({
      where: {
        id: input.menuId,
      },
      data: {
        categoryId: input.categoryId,
      },
    });
  }
}
