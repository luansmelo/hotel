import {
  AddProductModal,
  AddProductRepositoryModal,
  MenuProduct,
} from "@/dto/menu/menu.dto";
import { MenuModal, MenuProductInput } from "@/dto/menu/menu.dto";

export interface MenuRepositoryContract {
  save(input: MenuModal): Promise<MenuModal>;
  getById(id: string): Promise<MenuModal | null>;
  getList(day?: string): Promise<any | null>;
  deleteById(id: string): Promise<MenuModal | null>;
  getSelectedMenu(input: MenuProductInput): Promise<any | null>;
  deleteProduct(input: MenuProduct): Promise<void>;
  addProduct(input: AddProductRepositoryModal[]): Promise<void>;
  updateById(id: string, name: string): Promise<void>;
}

export interface MenuServiceContract {
  create(input: MenuModal): Promise<MenuModal>;
  getById(id: string): Promise<MenuModal | null>;
  deleteById(id: string): Promise<MenuModal | null>;
  getAll(day?: string): Promise<any | null>;
  getSelectedMenu(input: MenuProductInput): Promise<any | null>;
  deleteProduct(input: MenuProduct): Promise<void>;
  addProduct(input: AddProductModal): Promise<void>;
  updateById(id: string, name: string): Promise<void>;
}
