import prisma from "@/config/prisma";

import { DeleteMeasureController } from "@/controllers/measure/DeleteMeasureController";
import { MeasureRepository } from "@/repositories/measure.repository";
import { DeleteMeasureUseCase } from "@/useCase/measure/DeleteMeasuresUseCase";
import { FindMeasureByIdUseCase } from "@/useCase/measure/FindMeasureByIdUseCase";

export function makeDeleteMeasureController(): DeleteMeasureController {
  const repo = new MeasureRepository(prisma);

  const findMeasureById = new FindMeasureByIdUseCase(repo);

  const deleteMeasure = new DeleteMeasureUseCase(repo, findMeasureById);

  return new DeleteMeasureController(deleteMeasure);
}
