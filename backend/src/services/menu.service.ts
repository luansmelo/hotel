import {
  MenuRepositoryContract,
  MenuServiceContract,
} from "../utils/contracts/menu-contract";
import {
  AddCategoryToMenuDTO,
  MenuData,
  MenuProductDTO,
} from "../dto/menu.dto";
import { NotFoundError } from "../errors/httpErrors";
import { uuid } from "uuidv4";

export class MenuService implements MenuServiceContract {
  constructor(private readonly repository: MenuRepositoryContract) {}

  async create(input: MenuData) {
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

  async getAll() {
    return this.repository.getList();
  }

  async addCategoryToMenu(input: AddCategoryToMenuDTO): Promise<void> {
    await this.getById(input.menuId);

    return this.repository.addCategoryToMenu(input);
  }

  async getSelectedMenu(input: MenuProductDTO): Promise<any> {
    return this.repository.getSelectedMenu(input);
  }
}
