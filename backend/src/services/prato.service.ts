import { PratoDTO } from "../dto/prato.dto";
import { ConflictError } from "../errors/httpErrors";
import { PratoRepository } from "../repositories/pratos.repository";

export class PratoService {
  constructor(private readonly pratoRepository: PratoRepository) {}

  async createDish(payload: PratoDTO) {
    const dish = await this.pratoRepository.getDishByDescription(
      payload.description
    );

    if (dish) {
      throw new ConflictError("Prato já cadastrado");
    }

    return this.pratoRepository.createDish(payload);
  }

  async getDishs() {
    return this.pratoRepository.getDishs();
  }
}
