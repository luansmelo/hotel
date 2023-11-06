import {
  InputRepositoryContract,
  InputServiceContract,
} from "../contracts/input-contract";
import { InputDTO } from "../dto/input.dto";
import { ConflictError } from "../errors/httpErrors";

export class InputService implements InputServiceContract {
  constructor(private readonly inputRepository: InputRepositoryContract) {}

  async create(input: InputDTO) {
    return this.inputRepository.save(input);
  }

  async getAll() {
    return this.inputRepository.getAll();
  }

  async updateById(id: string, input: InputDTO) {
    return this.inputRepository.updateById(id, input);
  }

  async deleteById(id: string) {
    return this.inputRepository.deleteById(id);
  }
}
