import zod from "zod";

export interface MenuDTO {
  name: string;
}

export interface AddCategoryToMenuDTO {
  menuId: string;
  categoryId: string;
}

export interface AddProductToMenuDTO {
  menuId: string;
  productId: string;
  day: number;
  category: number;
}

export interface MenuProductDTO {
  menuId: string;
  categoryId: string;
  day: any;
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
