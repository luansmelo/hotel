import zod from "zod";

export const CategorySchema = zod.object({
  name: zod.string({
    required_error: "O nome da categoria é obrigatório",
    invalid_type_error: "O nome da categoria deve ser uma string",
  }),
});

export const ProductToCategorySchema = zod.object({
  id: zod.string().optional(),
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

export const ProductCategorySchema = zod.object({
  menuId: zod.string({
    required_error: "O id do menu é obrigatório",
    invalid_type_error: "O id do menu deve ser uma string",
  }),
  categoryId: zod.string({
    required_error: "O id da categoria é obrigatório",
    invalid_type_error: "O id da categoria deve ser uma string",
  }),
  product: zod.array(
    zod.string({
      required_error: "O id do produto é obrigatório",
      invalid_type_error: "O id do produto deve ser uma string",
    })
  ),
  weekDay: zod.string({
    required_error: "O dia da semana é obrigatório",
    invalid_type_error: "O dia da semana deve ser uma string",
  }),
});
