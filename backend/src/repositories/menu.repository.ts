import { MenuContract, MenuProductInput } from "../dto/menu.dto";
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
                CategoryProductSchedule: {
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
}
