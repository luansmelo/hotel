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

  async getAll() {
    return this.repository.getList();
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
    return this.repository.getSelectedMenu(input);
  }
}
