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
    inputs: product?.inputs.map((input) => ({
      id: input.input.id,
      name: input.input.name,
      code: input.input.code,
      grammage: input.grammage,
      unitPrice: input.input.unitPrice,
      measurementUnit: {
        id: input.input.measurementUnit.id,
        name: input.input.measurementUnit.name,
        createdAt: input.input.measurementUnit.createdAt,
        updatedAt: input.input.measurementUnit.updatedAt,
      },
      groups: input.input.groups.map((group) => ({
        id: group.group.id,
        name: group.group.name,
      })),
    })),
  };
}
