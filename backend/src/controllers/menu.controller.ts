import { MenuServiceContract } from "@/utils/contracts/menu-contract";
import { MenuInput, MenuProductInput } from "@/dto/menu/menu.dto";
import {
  ProductCategoryInput,
  ProductToCategoryInput,
} from "@/dto/category/category.dto";

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

  async getSelectedMenu(input: MenuProductInput) {
    return this.service.getSelectedMenu(input);
  }

  async deleteProduct(input: ProductToCategoryInput) {
    return this.service.deleteProduct(input);
  }

  async addProduct(input: ProductCategoryInput) {
    return this.service.addProduct(input);
  }

  async deleteById(id: string) {
    return this.service.deleteById(id);
  }

  async update(id: string, name: string) {
    return this.service.update(id, name);
  }
}
