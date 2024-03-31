import { FindMeasureByIdContract } from "@/contracts";
import { FindInputByNameContract } from "@/contracts/input";
import {
  CreateInput,
  CreateInputContract,
  InputModel,
} from "@/contracts/input/CreateInputContract";
import { FindInputByCodeContract } from "@/contracts/input/FindInputByCodeContract";
import { LoadGroupByIdRepository } from "@/data/protocols/db/group/LoadGroupByIdRepository.protocol";
import { LoadMeasureByIdRepository } from "@/data/protocols/db/measure/LoadMeasureByIdRepository.protocol";
import { CreateInputModel } from "@/entities/input/createInput";
import { CodeAlreadyExistsError } from "@/presentation/errors/CodeAlreadyExistsError";
import { GroupNotFoundError } from "@/presentation/errors/GroupNotFoundError";
import { InputAlreadyExistsError } from "@/presentation/errors/InputAlreadyExistsError";
import { MeasureNotFoundError } from "@/presentation/errors/MeasureNotFoundError";

export class CreateInputUseCase implements CreateInput {
  constructor(
    private readonly createInput: CreateInputContract,
    private readonly findByName: FindInputByNameContract,
    private readonly findByCode: FindInputByCodeContract,
    private readonly findMeasureById: LoadMeasureByIdRepository,
    private readonly findGroupById: LoadGroupByIdRepository
  ) {}

  async create(inputModel: CreateInputModel): Promise<InputModel> {
    const input = await this.findByName.findByName(inputModel.name);

    if (input) {
      throw new InputAlreadyExistsError("Insumo já cadastrado");
    }

    const code = await this.findByCode.findByCode(inputModel.code);

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

    return this.createInput.save(inputModel);
  }
}
