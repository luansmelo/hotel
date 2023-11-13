import {
  AddCategoryToMenuDTO,
  MenuDTO,
  MenuData,
  MenuProductDTO,
} from "../../dto/menu.dto";

export interface MenuRepositoryContract {
  save(input: MenuData): Promise<void>;
  getById(id: string): Promise<any>;
  getList(): Promise<any>;
  addCategoryToMenu(input: AddCategoryToMenuDTO): Promise<void>;
  getSelectedMenu(input: MenuProductDTO): Promise<any>;
}

export interface MenuServiceContract {
  create(input: MenuDTO): Promise<void>;
  getById(id: string): Promise<any>;
  getAll(): Promise<any>;
  addCategoryToMenu(input: AddCategoryToMenuDTO): Promise<void>;
  getSelectedMenu(input: MenuProductDTO): Promise<any>;
}
