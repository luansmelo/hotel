import {
  MenuRepositoryContract,
  MenuServiceContract,
} from "../contracts/menu-contract";
import { InputDTO } from "../dto/input.dto";
import { AddCategoryToMenuDTO } from "../dto/menu.dto";

export class MenuService implements MenuServiceContract {
  constructor(private readonly menuRepository: MenuRepositoryContract) {}

  async create(input: InputDTO) {
    return this.menuRepository.save(input);
  }

  async getAll() {
    return this.menuRepository.getList();
  }

  addCategoryToMenu(input: AddCategoryToMenuDTO): Promise<void> {
    return this.menuRepository.addCategoryToMenu(input);
  }
}
