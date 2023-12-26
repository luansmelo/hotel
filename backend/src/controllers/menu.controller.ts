import { MenuServiceContract } from "../utils/contracts/menu-contract";
import {
  AddCategoryToMenuInput,
  MenuInput,
  MenuProductInput,
} from "../dto/menu.dto";

export class MenuController {
  constructor(private readonly service: MenuServiceContract) {}

  async create(input: MenuInput) {
    return this.service.create(input);
  }

  async getAll(day?: string) {
    return this.service.getAll(day);
  }

  async getById(id: string) {
    return this.service.getById(id);
  }

  async addCategoryToMenu(input: AddCategoryToMenuInput) {
    return this.service.addCategoryToMenu(input);
  }

  async getSelectedMenu(input: MenuProductInput) {
    return this.service.getSelectedMenu(input);
  }
}
