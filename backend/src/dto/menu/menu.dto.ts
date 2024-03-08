import zod from "zod";
import { Product } from "../product/product.dto";

export interface AddProductRepositoryModal {
  id?: string;
  menuId: string;
  categoryId: string;
  productId: string;
  weekDay: string;
}

export interface AddProductModal {
  menuId: string;
  categoryId: string;
  product: Product[];
}

export interface MenuProduct extends AddProductRepositoryModal {}

export interface MenuModal {
  id?: string;
  name: string;
}

export interface AddCategoryToMenuInput {
  menuId: string;
  categoryId: string;
}

export interface AddCategoryToMenuContract {
  id: string;
  menuId: string;
  categoryId: string;
}

export interface MenuProductInput {
  menuId: string;
  categoryId: string;
  day: string;
}

export interface MenuProductContract {
  id: string;
  menuId: string;
  categoryId: string;
  day: string;
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

export const AddCategoryToMenuSchema = zod.array(
  zod.object({
    menuId: zod.string({
      required_error: "O id do menu é obrigatório",
      invalid_type_error: "O id do menu precisa ser uma string",
    }),
    categoryId: zod.string({
      required_error: "O id da categoria é obrigatório",
      invalid_type_error: "O id da categoria precisa ser uma string",
    }),
  })
);

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
