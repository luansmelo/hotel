import {
  InputRepositoryContract,
  InputServiceContract,
} from "../contracts/input-contract";
import { InputDTO } from "../dto/input.dto";
import { ConflictError, NotFoundError } from "../errors/httpErrors";

export class InputService implements InputServiceContract {
  constructor(private readonly inputRepository: InputRepositoryContract) {}

  async create(input: InputDTO) {
    return this.inputRepository.save(input);
  }

  async getAll() {
    return this.inputRepository.getAll();
  }

  async getById(id: string) {
    const input = await this.inputRepository.getById(id);

    if (!input) {
      throw new NotFoundError("Insumo não encontrado");
    }

    return input;
  }

  async updateById(id: string, input: InputDTO) {
    const inputExists = await this.getById(id);

    return this.inputRepository.updateById(inputExists.id, input);
  }

  async deleteById(id: string) {
    const input = await this.getById(id);

    return this.inputRepository.deleteById(input.id);
  }
}
