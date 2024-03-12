import {
  CreateMeasureContract,
  DeleteMeasureContract,
  FindMeasureByIdContract,
  FindMeasureByNameContract,
  FindMeasuresContract,
  MeasureModel,
  UpdateMeasureContract,
} from "@/contracts/measure";
import { CreateMeasureModel } from "@/entities/measure/createMeasure";
import { PrismaClient } from "@prisma/client";

export class MeasureRepository
  implements
    CreateMeasureContract,
    FindMeasuresContract,
    FindMeasureByIdContract,
    FindMeasureByNameContract,
    DeleteMeasureContract,
    UpdateMeasureContract
{
  constructor(private readonly db: PrismaClient) {}

  async save(input: CreateMeasureModel): Promise<MeasureModel> {
    return this.db.measurementUnit.create({
      data: input,
    });
  }

  async findAll(): Promise<MeasureModel[] | null> {
    return this.db.measurementUnit.findMany();
  }

  async findById(id: string): Promise<MeasureModel | null> {
    return this.db.measurementUnit.findUnique({ where: { id } });
  }

  async findByName(name: string): Promise<MeasureModel | null> {
    return this.db.measurementUnit.findUnique({ where: { name } });
  }

  async deleteById(id: string): Promise<MeasureModel> {
    return this.db.measurementUnit.delete({ where: { id } });
  }

  async updateById(
    id: string,
    input: Partial<CreateMeasureModel>
  ): Promise<MeasureModel> {
    return this.db.measurementUnit.update({
      where: { id },
      data: input,
    });
  }
}
