import { FindMeasureByIdContract } from "@/contracts";
import { FindGroupsByIdContract } from "@/contracts/group/FindGroupsByIdContract";
import {
  FindInputByIdContract,
  InputModel,
  UpdateInput,
  UpdateInputContract,
} from "@/contracts/input";

import { CreateInputModel } from "@/entities/input/createInput";
import { GroupNotFoundError } from "@/utils/errors/GroupNotFoundError";
import { InputNotFoundError } from "@/utils/errors/InputNotFoundError";
import { MeasureNotFoundError } from "@/utils/errors/MeasureNotFoundError";

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
  ): Promise<Partial<InputModel>> {
    const input = await this.findInput.findById(id);

    if (!input) {
      throw new InputNotFoundError();
    }

    if (param.measurementUnitId !== input.measurementUnit.id) {
      const measure = await this.findMeasure.findById(param.measurementUnitId);

      if (!measure) {
        throw new MeasureNotFoundError();
      }
    }

    const groupsIDs = param.groups || [];

    if (!groupsIDs.length) {
      throw new GroupNotFoundError();
    }

    const groups = await this.findGroups.findByIds(groupsIDs);

    if (groups.length !== groupsIDs.length) {
      throw new GroupNotFoundError();
    }

    return this.updateInput.updateById(input.id, param);
  }
}
