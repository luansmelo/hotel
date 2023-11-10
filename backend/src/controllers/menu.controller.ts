import { MenuServiceContract } from "../contracts/menu-contract";
import { AddCategoryToMenuDTO, AddProductToMenuDTO, MenuDTO } from "../dto/menu.dto";

export class MenuController {
  constructor(private readonly menuService: MenuServiceContract) {}

  async create(input: MenuDTO) {
    return this.menuService.create(input);
  }

  async getAll() {
    return this.menuService.getAll();
  }

  async addCategoryToMenu(input: AddCategoryToMenuDTO) {
    return this.menuService.addCategoryToMenu(input);
  }
}
