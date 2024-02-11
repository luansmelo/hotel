import {
  MenuRepositoryContract,
  MenuServiceContract,
} from "../utils/contracts/menu-contract";
import { MenuContract, MenuInput, MenuProductInput } from "../dto/menu.dto";
import { NotFoundError } from "../errors/httpErrors";
import {
  ProductCategoryInput,
  ProductToCategoryInput,
} from "../dto/category.dto";
import { uuid } from "uuidv4";

export class MenuService implements MenuServiceContract {
  constructor(private readonly repository: MenuRepositoryContract) {}

  async create(input: MenuInput) {
    const data = {
      id: uuid(),
      name: input.name,
      created_at: new Date().toDateString(),
      updated_at: new Date().toDateString(),
    };

    const menu = await this.repository.save(data);

    return {
      id: menu.id,
      name: menu.name,
      created_at: menu.created_at,
      updated_at: menu.updated_at,
    };
  }

  async getById(id: string): Promise<any> {
    const menu = await this.repository.getById(id);

    if (!menu) throw new NotFoundError("Cardápio não encontrado");
    return menu;
  }

  async getAll(day?: string) {
    const menus = await this.repository.getList(day);

    return menus?.map((list) => ({
      menuId: list.id,
      name: list.name,
      category: list.categoryProductSchedule.map((category) => ({
        id: category.category.id,
        name: category.category.name,
      })),
    }));
  }

  async getSelectedMenu(input: MenuProductInput) {
    const menu = await this.repository.getSelectedMenu(input);

    if (!menu) throw new NotFoundError("Cardápio não encontrado");

    const data = {
      menuId: menu?.id,
      name: menu?.name,
      categories: (menu?.categoryProductSchedule || []).map(
        (categoryProductSchedule) => ({
          id: categoryProductSchedule.category.id,
          name: categoryProductSchedule.category.name,
          products: (
            categoryProductSchedule.category.categoryProductSchedule || []
          ).map((schedule) => ({
            id: schedule.product.id,
            name: schedule.product.name,
            description: schedule.product.description,
            weekDay: schedule.weekDay,
            inputs: schedule.product.inputs,
          })),
        })
      ),
    };

    return data;
  }

  async deleteById(id: string): Promise<MenuContract | null> {
    const menu = await this.getById(id);

    return this.repository.deleteById(menu.id);
  }

  async deleteProduct(input: ProductToCategoryInput): Promise<void> {
    await this.getById(input.categoryId);

    await this.repository.deleteProduct(input);
  }

  async addProduct(input: ProductCategoryInput): Promise<void> {
    await this.getById(input.categoryId);

    const products = input.product.flatMap(({ productId, weekDay }) => {
      return weekDay.map((day) => ({
        id: uuid(),
        menuId: input.menuId,
        categoryId: input.categoryId,
        productId,
        weekDay: day,
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
      }));
    });

    await this.repository.addProduct(products);
  }

  async update(id: string, name: string) {
    await this.repository.update(id, name);
  }
}
