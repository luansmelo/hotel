import prisma from "@/config/prisma";

import { FindMeasureByIdController } from "@/presentation/controllers/measure/FindMeasureByIdController";
import { MeasureRepository } from "@/infra/db/mysql/MeasureRepository";
import { FindMeasureByIdUseCase } from "@/data/usecases/measure/FindMeasureByIdUseCase";

export function makeFindMeasureByIdController(): FindMeasureByIdController {
  const repo = new MeasureRepository(prisma);

  const findMeasureById = new FindMeasureByIdUseCase(repo);

  return new FindMeasureByIdController(findMeasureById);
}
