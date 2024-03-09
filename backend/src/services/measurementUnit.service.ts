import { NotFoundError } from "@/utils/errors/httpErrors";
import { MeasureModel } from "@/dto/measurementUnit/measurementUnit.dto";
import {
  MeasurementUnitRepositoryContract,
  MeasurementUnitServiceContract,
} from "@/utils/contracts/measurementUnit-contract";

export class MeasurementUnitService implements MeasurementUnitServiceContract {
  constructor(private readonly repository: MeasurementUnitRepositoryContract) {}
  async create(input: MeasureModel): Promise<void> {
    await this.repository.save(input);
  }
  async getById(id: string): Promise<any> {
    const measurementUnit = await this.repository.getById(id);

    if (!measurementUnit) throw new NotFoundError("Grupo não encontrado");
    return measurementUnit;
  }

  async getAll(): Promise<any> {
    return this.repository.getAll();
  }

  async deleteById(id: string): Promise<MeasureModel> {
    const measure = await this.getById(id);

    return this.repository.deleteById(measure.id);
  }

  async updateById(id: string, input: MeasureModel) {
    const measure = await this.getById(id);

    return this.repository.updateById(measure.id, input);
  }
}
