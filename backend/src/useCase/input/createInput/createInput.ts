import { FindMeasureByIdContract } from "@/contracts";
import { FindGroupByIdContract } from "@/contracts/group";
import { FindInputByNameContract } from "@/contracts/input";
import {
  CreateInput,
  CreateInputContract,
  InputModel,
} from "@/contracts/input/createInput";
import { FindInputByCodeContract } from "@/contracts/input/findInputByCode";
import { CreateInputModel } from "@/entities/input/createInput";
import { ConflictError } from "@/utils/errors/httpErrors";

export class CreateInputUseCase implements CreateInput {
  constructor(
    private readonly createInput: CreateInputContract,
    private readonly findByName: FindInputByNameContract,
    private readonly findByCode: FindInputByCodeContract,
    private readonly findMeasureById: FindMeasureByIdContract,
    private readonly findGroupById: FindGroupByIdContract
  ) {}

  async create(inputModel: CreateInputModel): Promise<InputModel> {
    const input = await this.findByName.findByName(inputModel.name);

    if (input) {
      throw new ConflictError("Insumo já cadastrado");
    }

    const code = await this.findByCode.findByCode(inputModel.code);

    if (code) {
      throw new ConflictError("Código já cadastrado");
    }

    const measure = await this.findMeasureById.findById(
      inputModel.measurementUnitId
    );

    if (!measure) {
      throw new ConflictError("Unidade de medida não encontrada");
    }

    const groups = await Promise.all(
      inputModel.groups.map((group) => this.findGroupById.findById(group))
    );

    if (groups.some((group) => !group)) {
      throw new ConflictError("Grupos não encontrados");
    }

    return this.createInput.save(inputModel);
  }
}
