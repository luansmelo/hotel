import { CreateMeasureRepository } from "@/data/protocols/db/measure/CreateMeasureRepository.protocol";
import { DeleteMeasureRepository } from "@/data/protocols/db/measure/DeleteMeasureRepository.protocol.ts";
import { LoadMeasureByIdRepository } from "@/data/protocols/db/measure/LoadMeasureByIdRepository.protocol";
import { LoadMeasureByNameRepository } from "@/data/protocols/db/measure/LoadMeasureByNameRepository.protocol.ts";
import { LoadMeasuresRepository } from "@/data/protocols/db/measure/LoadMeasuresRepository.protocol";
import { UpdateMeasureRepository } from "@/data/protocols/db/measure/UpdateMeasureRepository.protocol";
import { MeasureModel } from "@/domain/models/Measure";
import { CreateMeasureModel } from "@/domain/usecases/measure/CreateMeasure";
import Measure from "@/data/local/entity/measure";

export class MeasureRepository
  implements
  CreateMeasureRepository,
  LoadMeasureByIdRepository,
  LoadMeasureByNameRepository,
  LoadMeasuresRepository,
  DeleteMeasureRepository,
  UpdateMeasureRepository {

  async create(input: CreateMeasureModel): Promise<MeasureModel> {
    return Measure.create({
      data: input,
    });
  }

  async loadAll(): Promise<MeasureModel[] | null> {
    return Measure.findMany();
  }

  async loadById(id: string): Promise<MeasureModel | null> {
    return Measure.findUnique({ where: { id } });
  }

  async loadByName(name: string): Promise<MeasureModel | null> {
    return Measure.findUnique({ where: { name } });
  }

  async deleteById(id: string): Promise<MeasureModel> {
    return Measure.delete({ where: { id } });
  }

  async updateById(
    id: string,
    input: Partial<CreateMeasureModel>
  ): Promise<MeasureModel> {
    return Measure.update({
      where: { id },
      data: input,
    });
  }
}
