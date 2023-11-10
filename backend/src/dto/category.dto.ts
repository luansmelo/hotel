import zod from "zod";

export interface CategoryDTO {
  name: string;
}

export interface ProductToCategoryDTO {
  id?: string;
  categoryId: string;
  productId: string;
  weekDay: string;
}

export const CategorySchema = zod.object({
  name: zod.string({
    required_error: "O nome da categoria é obrigatório",
    invalid_type_error: "O nome da categoria deve ser uma string",
  }),
});

export const ProductToCategorySchema = zod.object({
  categoryId: zod.string({
    required_error: "O id da categoria é obrigatório",
    invalid_type_error: "O id da categoria deve ser uma string",
  }),
  productId: zod.string({
    required_error: "O id do produto é obrigatório",
    invalid_type_error: "O id do produto deve ser uma string",
  }),
  weekDay: zod.string({
    required_error: "O dia da semana é obrigatório",
    invalid_type_error: "O dia da semana deve ser uma string",
  }),
});
