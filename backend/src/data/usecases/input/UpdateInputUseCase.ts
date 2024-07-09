import { LoadGroupsByIdsRepository } from "@/data/protocols/db/group/LoadGroupsByIdsRepository.protocol";
import { LoadInputByIdRepository } from "@/data/protocols/db/input/LoadIngredientByIdRepository.protocol";
import { UpdateIngredientRepository } from "@/data/protocols/db/input/UpdateIngredientRepository.protocol";
import { LoadMeasureByIdRepository } from "@/data/protocols/db/measure/LoadMeasureByIdRepository.protocol";
import { InputModel } from "@/domain/models/Input";
import { CreateInputModel } from "@/domain/usecases/input/CreateInput";
import { UpdateInputUseCaseContract } from "@/domain/usecases/input/UpdateInput";
import { GroupNotFoundError } from "@/presentation/errors/GroupNotFoundError";
import { InputNotFoundError } from "@/presentation/errors/InputNotFoundError";
import { MeasureNotFoundError } from "@/presentation/errors/MeasureNotFoundError";

export class UpdateInputUseCase implements UpdateInputUseCaseContract {
  constructor(
    private readonly updateInput: UpdateIngredientRepository,
    private readonly findInput: LoadInputByIdRepository,
    private readonly findMeasure: LoadMeasureByIdRepository,
    private readonly findGroups: LoadGroupsByIdsRepository
  ) {}

  async updateById(
    id: string,
    param: Partial<CreateInputModel>
  ): Promise<Partial<InputModel>> {
    const input = await this.findInput.loadById(id);

    if (!input) {
      throw new InputNotFoundError();
    }

    if (param.measurementId !== input.measurement.id) {
      const measure = await this.findMeasure.loadById(param.measurementId);
      if (!measure) {
        throw new MeasureNotFoundError();
      }
    }

    const groupsIDs = param.groupIds || [];

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
