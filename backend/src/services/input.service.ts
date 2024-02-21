import {
  InputRepositoryContract,
  InputServiceContract,
} from "@/utils/contracts/input-contract";
import { InputRegister } from "@/dto/input.dto";
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "@/utils/errors/httpErrors";
import { uuid } from "uuidv4";
import { MeasurementUnitRepositoryContract } from "@/utils/contracts/measurementUnit-contract";

export class InputService implements InputServiceContract {
  constructor(
    private readonly repository: InputRepositoryContract,
    private readonly measurementRepository: MeasurementUnitRepositoryContract
  ) {}

  async create(input: InputRegister) {
    if (!input.groups || !input.groups.length)
      throw new UnauthorizedError("A lista de grupos não pode ser vazia.");

    const measurementUnit = await this.measurementRepository.getById(
      input.measurementUnitId
    );

    if (!measurementUnit)
      throw new UnauthorizedError("Unidade de medida não cadastrada");

    const inputExists = await this.repository.getByCode(input.code);
    if (inputExists) throw new ConflictError("O código deve ser único");

    const data = {
      id: uuid(),
      ...input,
      created_at: new Date().toDateString(),
      updated_at: new Date().toDateString(),
    };

    return this.repository.save(data);
  }

  async getAll() {
    const input = await this.repository.getAll();

    const data = input.map((item) => {
      return {
        id: item.id,
        name: item.name,
        unitPrice: item.unitPrice,
        measurementUnit: item.measurementUnit.name,
        code: item.code,
        groups: item.groups.map((e) => e.group) || [],
      };
    });

    return data;
  }

  async getById(id: string) {
    const input = await this.repository.getById(id);

    if (!input) throw new NotFoundError("Insumo não encontrado");
    return input;
  }

  async updateById(id: string, input: InputRegister) {
    if (!input.groups || !input.groups.length)
      throw new UnauthorizedError("A lista de grupos não pode estar vazia.");

    const inputExists = await this.getById(id);

    const data = {
      id: uuid(),
      ...input,
      created_at: new Date().toDateString(),
      updated_at: new Date().toDateString(),
    };

    return this.repository.updateById(inputExists.id, data);
  }

  async deleteById(id: string) {
    const input = await this.getById(id);
    return this.repository.deleteById(input.id);
  }
}
