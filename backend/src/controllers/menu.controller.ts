import { MenuServiceContract } from "../contracts/menu-contract";
import { AddProductToMenuDTO, MenuDTO } from "../dto/menu.dto";

export class MenuController {
  constructor(private readonly menuService: MenuServiceContract) {}

  async create(input: MenuDTO) {
    return this.menuService.create(input);
  }

  async getAll() {
    return this.menuService.getAll();
  }

  async addProductToMenu(input: AddProductToMenuDTO) {
    return this.menuService.addProductToMenu(input);
  }
}
