import { FindMeasureByIdContract } from "@/contracts";
import { FindGroupsByIdContract } from "@/contracts/group/FindGroupsByIdContract";
import {
  FindInputByIdContract,
  UpdateInput,
  UpdateInputContract,
} from "@/contracts/input";

import { CreateInputModel } from "@/entities/input/createInput";
import { BadRequestError, NotFoundError } from "@/utils/errors/httpErrors";

export class UpdateInputUseCase implements UpdateInput {
  constructor(
    private readonly updateInput: UpdateInputContract,
    private readonly findInput: FindInputByIdContract,
    private readonly findMeasure: FindMeasureByIdContract,
    private readonly findGroups: FindGroupsByIdContract
  ) {}

  async updateById(
    id: string,
    param: Partial<CreateInputModel>
  ): Promise<void> {
    const input = await this.findInput.findById(id);

    if (!input) {
      throw new NotFoundError("Insumo não encontrado");
    }

    if (param.measurementUnitId !== input.measurementUnit.id) {
      const measure = await this.findMeasure.findById(param.measurementUnitId);

      if (!measure) {
        throw new NotFoundError("Unidade de medida não encontrada");
      }
    }

    const groupsIDs = param.groups || [];

    if (!groupsIDs.length) {
      throw new BadRequestError("Nenhum grupo informado");
    }

    const groups = await this.findGroups.findByIds(groupsIDs);

    if (groups.length !== groupsIDs.length) {
      throw new NotFoundError("Um ou mais grupos não encontrados");
    }

    await this.updateInput.updateById(input.id, param);
  }
}
