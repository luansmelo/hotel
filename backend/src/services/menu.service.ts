import {
  MenuRepositoryContract,
  MenuServiceContract,
} from "../utils/contracts/menu-contract";
import {
  AddCategoryToMenuInput,
  MenuInput,
  MenuProductContract,
  MenuProductInput,
} from "../dto/menu.dto";
import { NotFoundError } from "../errors/httpErrors";
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

    return this.repository.save(data);
  }

  async getById(id: string): Promise<any> {
    const menu = await this.repository.getById(id);

    if (!menu) {
      throw new NotFoundError("Cardápio não encontrado");
    }

    return menu;
  }

  async getAll(day?: string) {
    const menus = await this.repository.getList(day);

    return menus?.map((list) => ({
      menuId: list.id,
      name: list.name,
      category: list.menuCategory.map((category) => ({
        id: category.category.id,
        name: category.category.name,
      })),
    }));
  }

  async addCategoryToMenu(input: AddCategoryToMenuInput): Promise<void> {
    await this.getById(input.menuId);

    const data = {
      id: uuid(),
      ...input,
      created_at: new Date().toDateString(),
      updated_at: new Date().toDateString(),
    };

    return this.repository.addCategoryToMenu(data);
  }

  async getSelectedMenu(input: MenuProductInput) {
    const menu = await this.repository.getSelectedMenu(input);

    const data = {
      menuId: menu.id,
      name: menu.name,
      category: menu.menuCategory.map((category) => ({
        id: category.category.id,
        name: category.category.name,
        schedule: category.category.categoryProductSchedule.map((schedule) => ({
          id: schedule.product.id,
          name: schedule.product.name,
          description: schedule.product.description,
          weekDay: schedule.weekDay,
        })),
      })),
    };

    if (!data) {
      throw new NotFoundError("Cardápio não encontrado");
    }

    return data;
  }
}
