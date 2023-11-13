import zod from "zod";
import { Weekdays } from "../utils/enums/weekdays";

export interface MenuInput {
  name: string;
}

export interface MenuContract {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface AddCategoryToMenuInput {
  menuId: string;
  categoryId: string;
}

export interface AddCategoryToMenuContract {
  id: string;
  menuId: string;
  categoryId: string;
  created_at: string;
  updated_at: string;
}

export interface MenuProductInput {
  menuId: string;
  categoryId: string;
  day: Weekdays;
}

export interface MenuProductContract {
  id: string;
  menuId: string;
  categoryId: string;
  day: string;
  created_at: string;
  updated_at: string;
}

export interface MenuProdutionMapDTO {
  menuId: string;
  productId: string;
  day: number;
  category: number;
}

export const MenuSchema = zod.object({
  name: zod.string({
    required_error: "O nome do menu é obrigatório",
    invalid_type_error: "O nome do menu precisa ser uma string",
  }),
});

export const AddCategoryToMenuSchema = zod.object({
  menuId: zod.string({
    required_error: "O id do menu é obrigatório",
    invalid_type_error: "O id do menu precisa ser uma string",
  }),
  categoryId: zod.string({
    required_error: "O id da categoria é obrigatório",
    invalid_type_error: "O id da categoria precisa ser uma string",
  }),
});

export const MenuProductSchema = zod.object({
  menuId: zod.string({
    required_error: "O id do menu é obrigatório",
    invalid_type_error: "O id do menu precisa ser uma string",
  }),
  categoryId: zod.string({
    required_error: "O id da categoria é obrigatório",
    invalid_type_error: "O id da categoria precisa ser uma string",
  }),
  day: zod.number({
    required_error: "O dia é obrigatório",
    invalid_type_error: "O dia precisa ser um número",
  }),
  category: zod.number({
    required_error: "A categoria é obrigatória",
    invalid_type_error: "A categoria precisa ser um número",
  }),
});
