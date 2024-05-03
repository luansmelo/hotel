import { mapperMenu } from "@/data/usecases/menu/mapper/mapperMenu";
import { CreateMenuRepository } from "@/data/protocols/db/menu/CreateMenuRepository.protocol";
import { LoadMenusRepository } from "@/data/protocols/db/menu/LoadMenusRepository.protocol";
import { LoadMenuByIdRepository } from "@/data/protocols/db/menu/LoadMenuByIdRepository.protocol";
import { LoadMenuByNameRepository } from "@/data/protocols/db/menu/LoadMenuByNameRepository.protocol.ts";
import { DeleteMenuRepository } from "@/data/protocols/db/menu/DeleteMenuRepository.protocol.ts";
import { UpdateMenuRepository } from "@/data/protocols/db/menu/UpdateMenuRepository.protocol";
import { Menu, MenuSchedule } from "@/data/local/entity/menu";
import { MenuModel } from "@/domain/models/Menu";
import { DeleteProductToMenuRepository } from "@/data/protocols/db/menu/DeleteProductToMenuRepository.protocol";
import { AddProductToMenuModel, AddProductToMenuRepository } from "@/data/protocols/db/menu/AddProductToMenuRepository.protocol";
import { CreateMenuModel } from "@/domain/usecases/menu/CreateMenu";
import { RemoveProductModel } from "@/domain/usecases/menu/DeleteProductToMenu";
import { LoadMenuRepository } from "@/data/protocols/db/menu/LoadMenuRepository";
import { FindMenuModel } from "@/domain/usecases/menu/LoadMenu";
import { FindMenuParams, FindMenuResponse } from "@/domain/usecases/menu/FindMenuParams";

export class MenuRepository
  implements
  CreateMenuRepository,
  LoadMenusRepository,
  LoadMenuByIdRepository,
  LoadMenuByNameRepository,
  DeleteMenuRepository,
  UpdateMenuRepository,
  DeleteProductToMenuRepository,
  AddProductToMenuRepository,
  LoadMenuRepository {

  async create(input: CreateMenuModel): Promise<MenuModel> {
    return Menu.create({
      data: input,
    });
  }

  async loadById(id: string): Promise<MenuModel | null> {
    const menu = await Menu.findUnique({
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

  async loadByName(name: string): Promise<MenuModel | null> {
    const db = await Menu.findUnique({
      where: {
        name,
      },
    });

    return db;
  }

  async loadMenu(input: FindMenuModel): Promise<MenuModel | null> {
    const menu = await Menu.findFirst({
      where: {
        id: input.menuId,
      },
      include: {
        categoryProductSchedule: {
          where: {
            AND: [
              {
                categoryId: input.categoryId,
                weekDay: input.weekDay,
              }
            ]
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
                        status: true,
                        accession: true,
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
                    weekDay: input.weekDay,
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

  async loadAll(findParams: FindMenuParams): Promise<FindMenuResponse> {
    const page = findParams.page || 1;
    const limit = process.env.PAGE_LIMIT
      ? parseInt(process.env.PAGE_LIMIT)
      : 10;
    const offset = (page - 1) * limit;
    const order = findParams.order || "asc";
    const sort = findParams.sort || "name";

    const menu = await Menu.findMany({
      orderBy:
      {
        [sort]: order,
      },
      include: {
        categoryProductSchedule: {
          include: {
            category: true,
          },
        },
      },
      take: limit,
      skip: offset,
    });

    const totalItems = menu.length;
    const totalPages = Math.ceil(totalItems / limit);

    return {
      menus: menu.map((menu) => mapperMenu(menu)),
      totalPages,
      totalItems,
    };
  }

  async deleteProduct(input: RemoveProductModel): Promise<void> {
    await MenuSchedule.deleteMany({
      where: {
        menuId: input.menuId,
        categoryId: input.categoryId,
        productId: input.productId,
        weekDay: input.weekDay,
      },
    });
  }

  async addProduct(input: AddProductToMenuModel[]): Promise<Partial<{ count: number }>> {
    return MenuSchedule.createMany({
      data: input.map((item) => ({
        menuId: item.menuId,
        categoryId: item.categoryId,
        productId: item.productId,
        weekDay: item.weekDay.toUpperCase(),
      })),
    });
  }

  async deleteById(id: string): Promise<MenuModel> {
    return Menu.delete({
      where: { id },
    });
  }

  async updateById(id: string, param: Partial<CreateMenuModel>): Promise<Partial<MenuModel>> {
    return Menu.update({
      where: { id },
      data: param,
    });
  }
}
