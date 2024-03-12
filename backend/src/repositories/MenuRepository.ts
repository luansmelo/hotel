import { AddProductToMenuContract } from "@/contracts/menu/AddProductToMenuContract";
import {
  CreateMenuContract,
  MenuModel,
} from "@/contracts/menu/CreateMenuContract";
import { DeleteMenuContract } from "@/contracts/menu/DeleteMenuContract";
import { DeleteProductToMenuContract } from "@/contracts/menu/DeleteProductToMenuContract";
import { FindMenuById } from "@/contracts/menu/FindMenuByIdContract";
import { FindMenuByNameContract } from "@/contracts/menu/FindMenuByNameContract";
import { FindMenuContract } from "@/contracts/menu/FindMenuContract";
import { FindMenusContract } from "@/contracts/menu/FindMenusContract";
import { UpdateMenuContract } from "@/contracts/menu/UpdateMenuContract";
import { AddProductToMenuModel } from "@/entities/menu/AddProductToMenuEntity";
import { CreateMenuModel } from "@/entities/menu/CreateMenuEntity";
import { FindMenuModel } from "@/entities/menu/FindMenuEntity";
import { RemoveProductModel } from "@/entities/menu/RemoveProductToMenuEntity";
import { mapperMenu } from "@/useCase/menu/mapper/mapperMenu";
import { PrismaClient } from "@prisma/client";

export class MenuRepository
  implements
    CreateMenuContract,
    FindMenuById,
    FindMenuContract,
    FindMenusContract,
    FindMenuByNameContract,
    DeleteMenuContract,
    DeleteProductToMenuContract,
    AddProductToMenuContract,
    UpdateMenuContract
{
  constructor(private readonly db: PrismaClient) {}

  async save(input: CreateMenuModel): Promise<MenuModel> {
    return this.db.menu.create({
      data: input,
    });
  }

  async findById(id: string): Promise<MenuModel | null> {
    const menu = await this.db.menu.findUnique({
      where: {
        id,
      },
      include: {
        categoryProductSchedule: {
          select: {
            category: true,
          },
        },
      },
    });

    return mapperMenu(menu);
  }

  async findByName(name: string): Promise<MenuModel | null> {
    const db = await this.db.menu.findUnique({
      where: {
        name,
      },
    });

    return db;
  }

  async findMenu(input: FindMenuModel): Promise<MenuModel | null> {
    const menu = await this.db.menu.findFirst({
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

    if (!menu) return null;

    return mapperMenu(menu);
  }

  async findAll(): Promise<MenuModel[] | null> {
    const menu = await this.db.menu.findMany({
      include: {
        categoryProductSchedule: {
          include: {
            category: true,
          },
        },
      },
    });

    return menu.map((menu) => mapperMenu(menu));
  }

  async deleteProduct(input: RemoveProductModel): Promise<void> {
    await this.db.categoryProductSchedule.deleteMany({
      where: {
        menuId: input.menuId,
        categoryId: input.categoryId,
        productId: input.productId,
        weekDay: input.weekDay,
      },
    });
    console.log("Delete Product", input);
  }

  async add(input: AddProductToMenuModel[]): Promise<void> {
    await this.db.categoryProductSchedule.createMany({
      data: input.map((item) => ({
        menuId: item.menuId,
        categoryId: item.categoryId,
        productId: item.productId,
        weekDay: item.weekDay,
      })),
    });
  }

  async deleteById(id: string): Promise<MenuModel> {
    return this.db.menu.delete({
      where: { id },
    });
  }

  async updateById(id: string, param: Partial<CreateMenuModel>): Promise<void> {
    await this.db.menu.update({
      where: { id },
      data: param,
    });
  }
}
