import prisma from "@/config/prisma";
import { FindMeasuresController } from "@/presentation/controllers/measure/FindMeasuresController";
import { MeasureRepository } from "@/infra/db/mysql/MeasureRepository";
import { FindMeasuresUseCase } from "@/data/usecases/measure/FindMeasuresUseCase";

export function makeFindMeasuresController(): FindMeasuresController {
  const repo = new MeasureRepository(prisma);

  const measures = new FindMeasuresUseCase(repo);

  return new FindMeasuresController(measures);
}
