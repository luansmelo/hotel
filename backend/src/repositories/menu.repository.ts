import {
  AddCategoryToMenuContract,
  MenuContract,
  MenuProductInput,
} from "../dto/menu.dto";
import { MenuRepositoryContract } from "../utils/contracts/menu-contract";
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
        menuCategory: true,
      },
    });

    return db;
  }

  async getSelectedMenu(input: MenuProductInput): Promise<any | null> {
    return this.db.menu.findUnique({
      where: {
        id: input.menuId,
      },
      include: {
        menuCategory: {
          where: {
            categoryId: input.categoryId,
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
                        inputs: true,
                      },
                    },
                  },
                  where: {
                    weekDay: input.day,
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
        menuCategory: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async addCategoryToMenu(input: AddCategoryToMenuContract): Promise<void> {
    await this.db.menuCategory.update({
      where: {
        id: input.menuId,
      },
      data: {
        menuId: input.menuId,
        categoryId: input.categoryId,
      },
    });
  }
}
