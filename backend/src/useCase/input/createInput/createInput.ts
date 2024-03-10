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
    private readonly findByCode: FindInputByCodeContract
  ) {}

  async create(inputModel: CreateInputModel): Promise<InputModel> {
    const input = await this.findByName.findByName(inputModel.name);

    if (input) {
      throw new ConflictError("Categoria já cadastrada");
    }

    const code = await this.findByCode.findByCode(inputModel.code);

    if (code) {
      throw new ConflictError("Código já cadastrado");
    }

    return this.createInput.save(inputModel);
  }
}
