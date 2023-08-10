import { InsumoDTO } from "../dto/insumo.dto";
import { ConflictError } from "../errors/httpErrors";
import { InsumoRepository } from "../repositories/insumos.repository";

export class InsumoService {
  constructor(private readonly insumoRepository: InsumoRepository) {}

  async createInsumo(payload: InsumoDTO) {
    const insumo = await this.insumoRepository.getInsumoByName(
      payload.nome.toLowerCase()
    );

    if (insumo) {
      throw new ConflictError("Insumo já cadastrado.");
    }

    return this.insumoRepository.handle(payload);
  }

  async getInsumos() {
    return this.insumoRepository.getInsumos();
  }
}
