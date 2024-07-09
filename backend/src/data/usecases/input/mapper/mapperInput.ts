export function mapperInput(input: any) {
  return {
    id: input?.id,
    name: input?.name,
    code: input.code,
    unitPrice: input.unitPrice,
    grammage: input.grammage,
    measurement: input.measurement,
    groups: input.groups.map((group) => group.group),
  };
}
