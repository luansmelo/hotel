export function mapperMenu(menu: any) {
  if (!menu) return null;

  const uniqueCategories = Array.from(
    new Set(menu.categoryProductSchedule.map((cps: any) => cps.category.id))
  );

  return {
    id: menu.id,
    name: menu.name,
    categories: uniqueCategories.map((categoryId) => {
      const category = menu.categoryProductSchedule.find(
        (cps: any) => cps.category.id === categoryId
      );

      return {
        categoryId: String(categoryId),
        name: category?.category.name || "",
        products: (category?.category.categoryProductSchedule || []).map(
          (schedule: any) => ({
            id: schedule.product.id,
            name: schedule.product.name,
            description: schedule.product.description,
            weekDay: schedule.weekDay,
            accession: schedule.product.accession,
            status: schedule.product.status,
            inputs: schedule.product.inputs.map((input: any) => ({
              id: input?.input.id,
              name: input?.input.name,
              code: input.input.code,
              unitPrice: input.input.unitPrice,
              grammage: input.grammage,
              measurementUnit: input.measurementUnit,
            })),
          })
        ),
      };
    }),
  };
}
