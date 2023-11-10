import {
  AddCategoryToMenuDTO,
  MenuDTO,
} from "../dto/menu.dto";

export interface MenuRepositoryContract {
  save(input: MenuDTO): Promise<void>;
  getList(): Promise<any>;
  addCategoryToMenu(input: AddCategoryToMenuDTO): Promise<void>;
}

export interface MenuServiceContract {
  create(input: MenuDTO): Promise<void>;
  getAll(): Promise<any>;
  addCategoryToMenu(input: AddCategoryToMenuDTO): Promise<void>;
}
