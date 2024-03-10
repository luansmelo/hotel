import { FindInputs, FindInputsContract } from "@/contracts/input";
import { InputModel } from "@/contracts/input/createInput";

export class FindInputsUseCase implements FindInputs {
  constructor(private readonly findInputs: FindInputsContract) {}

  async findAll(): Promise<InputModel[] | null> {
    const input = await this.findInputs.findAll();

    const data = input?.map((i) => {
      return {
        id: i.id,
        name: i.name,
        code: i.code,
        unitPrice: i.unitPrice,
        measurementUnit: i.measurementUnit,
        groups: i.groups,
      };
    }) as InputModel[];

    return data || null;
  }
}
