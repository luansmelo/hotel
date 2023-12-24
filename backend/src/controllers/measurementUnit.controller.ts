import { MeasurementUnitInput } from "../dto/measurementUnit.dto";
import { MeasurementUnitServiceContract } from "../utils/contracts/measurementUnit-contract";

export class MeasurementUnitController {
  constructor(private readonly service: MeasurementUnitServiceContract) {}

  async create(input: MeasurementUnitInput) {
    return this.service.create(input);
  }

  async getAll() {
    return this.service.getAll();
  }

  async getById(id: string) {
    return this.service.getById(id);
  }
}
