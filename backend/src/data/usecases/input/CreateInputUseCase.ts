import { LoadGroupByIdRepository } from "@/data/protocols/db/group/LoadGroupByIdRepository.protocol";
import { CreateInputRepository } from "@/data/protocols/db/input/CreateInputRepository.protocol";
import { LoadInputByCodeRepository } from "@/data/protocols/db/input/LoadInputByCodeRepository.protocol";
import { LoadInputByNameRepository } from "@/data/protocols/db/input/LoadInputByNameRepository.protocol";
import { LoadMeasureByIdRepository } from "@/data/protocols/db/measure/LoadMeasureByIdRepository.protocol";
import { InputModel } from "@/domain/models/Input";
import { CreateInputModel, CreateInputUseCaseContract } from "@/domain/usecases/input/CreateInput";
import { CodeAlreadyExistsError } from "@/presentation/errors/CodeAlreadyExistsError";
import { GroupNotFoundError } from "@/presentation/errors/GroupNotFoundError";
import { InputAlreadyExistsError } from "@/presentation/errors/InputAlreadyExistsError";
import { MeasureNotFoundError } from "@/presentation/errors/MeasureNotFoundError";

export class CreateInputUseCase implements CreateInputUseCaseContract {
  constructor(
    private readonly createInput: CreateInputRepository,
    private readonly findByName: LoadInputByNameRepository,
    private readonly findByCode: LoadInputByCodeRepository,
    private readonly findMeasureById: LoadMeasureByIdRepository,
    private readonly findGroupById: LoadGroupByIdRepository
  ) {}

  async create(inputModel: CreateInputModel): Promise<InputModel> {
    const input = await this.findByName.loadByName(inputModel.name);

    if (input) {
      throw new InputAlreadyExistsError("Insumo já cadastrado");
    }

    const code = await this.findByCode.loadByCode(inputModel.code);

    if (code) {
      throw new CodeAlreadyExistsError("Código já cadastrado");
    }

    const measure = await this.findMeasureById.loadById(
      inputModel.measurementUnitId
    );

    if (!measure) {
      throw new MeasureNotFoundError();
    }

    const groups = await Promise.all(
      inputModel.groups.map((groupId) => this.findGroupById.loadById(groupId))
    );

    if (groups.some((group) => !group)) {
      throw new GroupNotFoundError();
    }

    return this.createInput.create(inputModel);
  }
}
