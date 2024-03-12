import prisma from "@/config/prisma";
import { FindMeasuresController } from "@/controllers/measure/FindMeasuresController";
import { MeasureRepository } from "@/repositories/measure.repository";
import { FindMeasuresUseCase } from "@/useCase/measure/FindMeasuresUseCase";

export function makeFindMeasuresController(): FindMeasuresController {
  const repo = new MeasureRepository(prisma);

  const measures = new FindMeasuresUseCase(repo);

  return new FindMeasuresController(measures);
}
