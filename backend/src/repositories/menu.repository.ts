import {
  AddCategoryToMenuContract,
  MenuContract,
  MenuProductInput,
} from "../dto/menu.dto";
import { MenuRepositoryContract } from "../utils/contracts/menu-contract";
import { Weekdays } from "../utils/enums/weekdays";
import { PrismaClient } from "@prisma/client";

export class MenuRepository implements MenuRepositoryContract {
  constructor(private readonly db: PrismaClient) {}
  async save(input: MenuContract): Promise<void> {
    await this.db.menu.create({
      data: input,
    });
  }

  async getById(id: string): Promise<MenuContract | null> {
    const db = await this.db.menu.findUnique({
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

  async getSelectedMenu(input: MenuProductInput): Promise<any | null> {
    const menus = await this.db.menu.findMany({
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

    console.log(menus.map((menu) => menu.category?.categoryProductSchedule));

    return menus.map((menu) => {
      return {
        id: menu.id,
        name: menu.name,
        categoryId: menu.categoryId,
        data: menu.category?.categoryProductSchedule.map((item) => {
          return {
            weekDay: item?.weekDay as string,
            products: {
              id: item?.product.id,
              name: item?.product.name,
            },
          };
        }),
      };
    });
  }

  async getList(): Promise<MenuContract[] | null> {
    const db = await this.db.menu.findMany();
    return db;
  }

  async addCategoryToMenu(input: AddCategoryToMenuContract): Promise<void> {
    await this.db.menu.update({
      where: {
        id: input.menuId,
      },
      data: {
        categoryId: input.categoryId,
      },
    });
  }
}
