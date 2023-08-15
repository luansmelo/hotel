import { InputDTO } from "../dto/input.dto";
import { ConflictError } from "../errors/httpErrors";
import { InputRepository } from "../repositories/inputs.repository";

export class InputService {
  constructor(private readonly inputRepository: InputRepository) {}

  async createInput(payload: InputDTO) {
    const input = await this.inputRepository.getInputByName(payload.name);

    if (input) {
      throw new ConflictError("Insumo já cadastrado.");
    }

    return this.inputRepository.createInput(payload);
  }

  async getInputs() {
    return this.inputRepository.getInputs();
  }
}
