import {
  MenuRepositoryContract,
  MenuServiceContract,
} from "@/utils/contracts/menu-contract";
import { MenuModel, MenuProductInput } from "@/dto/menu/menu.dto";
import { NotFoundError } from "@/utils/errors/httpErrors";
import { AddProductModal, MenuProduct } from "@/dto/menu/menu.dto";

export class MenuService implements MenuServiceContract {
  constructor(private readonly repository: MenuRepositoryContract) {}

  async create(input: MenuModel) {
    const menu = await this.repository.save(input);
    return menu;
  }

  async getById(id: string): Promise<any> {
    const menu = await this.repository.getById(id);

    if (!menu) throw new NotFoundError("Cardápio não encontrado");
    return menu;
  }

  async getAll(day?: string) {
    const menus = await this.repository.getList(day);

    return menus?.map((list) => {
      const uniqueCategories = Array.from(
        new Set(
          list.categoryProductSchedule.map((category) => category.category.id)
        )
      );

      return {
        id: list.id,
        name: list.name,
        categories: uniqueCategories.map((categoryId) => {
          const category = list.categoryProductSchedule.find(
            (cps) => cps.category.id === categoryId
          );

          return {
            categoryId: categoryId,
            name: category?.category.name,
          };
        }),
      };
    });
  }

  async getSelectedMenu(input: MenuProductInput) {
    const menu = await this.repository.getSelectedMenu(input);

    if (!menu) throw new NotFoundError("Cardápio não encontrado");

    const uniqueCategories = Array.from(
      new Set(menu.categoryProductSchedule.map((cps) => cps.category.id))
    );

    const data = {
      id: menu?.id,
      name: menu?.name,
      categories: uniqueCategories.map((categoryId) => {
        const category = menu.categoryProductSchedule.find(
          (cps) => cps.category.id === categoryId
        );

        return {
          categoryId: categoryId,
          name: category?.category.name,
          products: (category?.category.categoryProductSchedule || []).map(
            (schedule) => ({
              id: schedule.product.id,
              name: schedule.product.name,
              description: schedule.product.description,
              weekDay: schedule.weekDay,
              inputs: schedule.product.inputs.map((input) => ({
                id: input?.input.id,
                name: input?.input.name,
                code: input.input.code,
                unitPrice: input.input.unitPrice,
                grammage: input.grammage,
                measurementUnit: input.measurementUnit,
              })),
            })
          ),
        };
      }),
    };

    return data;
  }

  async deleteById(id: string): Promise<MenuModel | null> {
    const menu = await this.getById(id);

    return this.repository.deleteById(menu.id);
  }

  async deleteProduct(input: MenuProduct): Promise<void> {
    await this.getById(input.menuId);

    await this.repository.deleteProduct(input);
  }

  async addProduct(input: AddProductModal): Promise<void> {
    await this.getById(input.menuId);

    const products = input.product.flatMap(({ productId, weekDay }) => {
      return weekDay.map((day) => ({
        menuId: input.menuId,
        categoryId: input.categoryId,
        productId,
        weekDay: day,
      }));
    });

    await this.repository.addProduct(products);
  }

  async updateById(id: string, name: string) {
    await this.repository.updateById(id, name);
  }
}
