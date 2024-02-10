import { PrismaClient } from "@prisma/client";
import { MeasurementUnitContract } from "../dto/measurementUnit.dto";
import { MeasurementUnitRepositoryContract } from "../utils/contracts/measurementUnit-contract";

export class MeasurementUnitRepository
  implements MeasurementUnitRepositoryContract
{
  constructor(private readonly db: PrismaClient) {}
  
  async save(input: MeasurementUnitContract) {
    await this.db.measurementUnit.create({
      data: input,
    });
  }
  
  async getAll(): Promise<any> {
    return this.db.measurementUnit.findMany();
  }
  
  async getById(id: string): Promise<any> {
    return this.db.measurementUnit.findUnique({ where: { id } });
  }
  
  async deleteById(id: string): Promise<MeasurementUnitContract> {
    return this.db.measurementUnit.delete({ where: { id } });
  }

  async updateById(id: string, input: MeasurementUnitContract) {
    return this.db.measurementUnit.update({
      where: { id },
      data: input,
    });
  }
}
