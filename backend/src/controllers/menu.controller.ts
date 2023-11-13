import { MenuServiceContract } from "../utils/contracts/menu-contract";
import {
  AddCategoryToMenuInput,
  MenuInput,
  MenuProductDTO,
} from "../dto/menu.dto";

export class MenuController {
  constructor(private readonly menuService: MenuServiceContract) {}

  async create(input: MenuInput) {
    return this.menuService.create(input);
  }

  async getAll() {
    return this.menuService.getAll();
  }

  async getById(id: string) {
    return this.menuService.getById(id);
  }

  async addCategoryToMenu(input: AddCategoryToMenuInput) {
    return this.menuService.addCategoryToMenu(input);
  }

  async getSelectedMenu(input: MenuProductDTO) {
    return this.menuService.getSelectedMenu(input);
  }
}
