import {
  MenuRepositoryContract,
  MenuServiceContract,
} from "../contracts/menu-contract";
import { InputDTO } from "../dto/input.dto";
import { AddCategoryToMenuDTO, MenuProductDTO } from "../dto/menu.dto";
import { NotFoundError } from "../errors/httpErrors";

export class MenuService implements MenuServiceContract {
  constructor(private readonly menuRepository: MenuRepositoryContract) {}

  async create(input: InputDTO) {
    return this.menuRepository.save(input);
  }

  async getById(id: string): Promise<any> {
    const menu = await this.menuRepository.getById(id);

    if (!menu) {
      throw new NotFoundError("Cardápio não encontrado");
    }

    return menu;
  }

  async getAll() {
    return this.menuRepository.getList();
  }

  async addCategoryToMenu(input: AddCategoryToMenuDTO): Promise<void> {
    await this.getById(input.menuId);

    return this.menuRepository.addCategoryToMenu(input);
  }

  async getSelectedMenu(input: MenuProductDTO): Promise<any> {
    return this.menuRepository.getSelectedMenu(input);
  }

  async deleteProduct(input: MenuProductDTO): Promise<void> {
    console.log("INPUT", input);
    // await this.getById(input.menu);

    await this.menuRepository.deleteProduct(input);
  }
}
