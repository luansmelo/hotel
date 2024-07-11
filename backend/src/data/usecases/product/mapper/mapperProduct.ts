export function mapperProduct(product: any) {
  if (!product) return null;
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    preparationTime: product.preparationTime,
    resource: product.resource,
    accession: product.accession,
    status: product.status,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    photo_url: product.photo_url || null,
    ingredients: product?.ingredients.map((input) => ({
      id: input.id,
      name: input.ingredient.name,
      code: input.ingredient.code,
      grammage: input.grammage,
      unitPrice: input.ingredient.unitPrice,
      measurement: input.ingredient.measurement,
      groups: input.ingredient.groups.map((group) => ({
        id: group.group.id,
        name: group.group.name,
      })),
    })),
  };
}
