import { NotFoundError } from "../errors/httpErrors";
import { uuid } from "uuidv4";
import {
  MeasurementUnitContract,
  MeasurementUnitInput,
} from "../dto/measurementUnit.dto";
import {
  MeasurementUnitRepositoryContract,
  MeasurementUnitServiceContract,
} from "../utils/contracts/measurementUnit-contract";

export class MeasurementUnitService implements MeasurementUnitServiceContract {
  constructor(private readonly repository: MeasurementUnitRepositoryContract) {}
  async create(input: MeasurementUnitInput): Promise<void> {
    const data = {
      id: uuid(),
      name: input.name,
      created_at: new Date().toDateString(),
      updated_at: new Date().toDateString(),
    };

    await this.repository.save(data);
  }
  async getById(id: string): Promise<any> {
    const measurementUnit = await this.repository.getById(id);

    if (!measurementUnit) {
      throw new NotFoundError("Grupo não encontrado");
    }

    return measurementUnit;
  }
  async getAll(): Promise<any> {
    return this.repository.getAll();
  }
  async deleteById(id: string): Promise<MeasurementUnitContract> {
    const measurementUnit = await this.getById(id);

    return this.repository.deleteById(measurementUnit.id);
  }

  async updateById(id: string, input: MeasurementUnitInput) {
    const measurementUnit = await this.getById(id);

    return this.repository.updateById(measurementUnit.id, input);
  }
}
