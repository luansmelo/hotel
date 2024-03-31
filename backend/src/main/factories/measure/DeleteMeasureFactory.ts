import prisma from "@/config/prisma";

import { DeleteMeasureController } from "@/presentation/controllers/measure/DeleteMeasureController";
import { MeasureRepository } from "@/infra/db/mysql/MeasureRepository";
import { DeleteMeasureUseCase } from "@/data/usecases/measure/DeleteMeasuresUseCase";
import { FindMeasureByIdUseCase } from "@/data/usecases/measure/FindMeasureByIdUseCase";

export function makeDeleteMeasureController(): DeleteMeasureController {
  const repo = new MeasureRepository(prisma);

  const findMeasureById = new FindMeasureByIdUseCase(repo);

  const deleteMeasure = new DeleteMeasureUseCase(repo, findMeasureById);

  return new DeleteMeasureController(deleteMeasure);
}
