import { FindMeasureByIdContract } from "@/contracts";

import {
  FindInputByIdContract,
  InputModel,
  UpdateInput,
  UpdateInputContract,
} from "@/contracts/input";
import { LoadGroupsByIdsRepository } from "@/data/protocols/db/group/LoadGroupsByIdsRepository.protocol";
import { LoadMeasureByIdRepository } from "@/data/protocols/db/measure/LoadMeasureByIdRepository.protocol";

import { CreateInputModel } from "@/entities/input/createInput";
import { GroupNotFoundError } from "@/presentation/errors/GroupNotFoundError";
import { InputNotFoundError } from "@/presentation/errors/InputNotFoundError";
import { MeasureNotFoundError } from "@/presentation/errors/MeasureNotFoundError";

export class UpdateInputUseCase implements UpdateInput {
  constructor(
    private readonly updateInput: UpdateInputContract,
    private readonly findInput: FindInputByIdContract,
    private readonly findMeasure: LoadMeasureByIdRepository,
    private readonly findGroups: LoadGroupsByIdsRepository
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
      const measure = await this.findMeasure.loadById(param.measurementUnitId);

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
