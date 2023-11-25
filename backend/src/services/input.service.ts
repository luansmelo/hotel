import {
  InputRepositoryContract,
  InputServiceContract,
} from "../utils/contracts/input-contract";
import { InputRegister } from "../dto/input.dto";
import { ConflictError, NotFoundError } from "../errors/httpErrors";
import { uuid } from "uuidv4";

export class InputService implements InputServiceContract {
  constructor(private readonly repository: InputRepositoryContract) {}

  async create(input: InputRegister) {
    const data = {
      id: uuid(),
      ...input,
      created_at: new Date().toDateString(),
      updated_at: new Date().toDateString(),
    };

    const inputExists = await this.repository.getByCode(input.code);

    if (inputExists) {
      throw new ConflictError("O código deve ser único");
    }

    return this.repository.save(data);
  }

  async getAll() {
    return this.repository.getAll();
  }

  async getById(id: string) {
    const input = await this.repository.getById(id);

    if (!input) {
      throw new NotFoundError("Insumo não encontrado");
    }

    return input;
  }

  async updateById(id: string, input: InputRegister) {
    const inputExists = await this.getById(id);

    return this.repository.updateById(inputExists.id, input);
  }

  async deleteById(id: string) {
    const input = await this.getById(id);

    return this.repository.deleteById(input.id);
  }
}
