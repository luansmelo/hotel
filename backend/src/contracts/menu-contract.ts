import { MenuDTO } from "../dto/menu.dto";

export interface MenuRepositoryContract {
  save(input: MenuDTO): Promise<void>;
  getList(): Promise<any>;
}

export interface MenuServiceContract {
  create(input: MenuDTO): Promise<void>;
  getAll(): Promise<any>;
}
