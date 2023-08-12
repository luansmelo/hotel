import { InputDTO } from "../dto/insumo.dto";
import { ConflictError } from "../errors/httpErrors";
import { InsumoRepository } from "../repositories/insumos.repository";

export class InputService {
  constructor(private readonly inputRepository: InsumoRepository) {}

  async createInput(payload: InputDTO) {
    const input = await this.inputRepository.getInputByName(payload.nome);

    if (input) {
      throw new ConflictError("Insumo já cadastrado.");
    }

    return this.inputRepository.createInput(payload);
  }

  async getInputs() {
    return this.inputRepository.getInputs();
  }
}
