import prisma from "@/config/prisma";

import { FindMeasureByIdController } from "@/controllers/measure/FindMeasureByIdController";
import { MeasureRepository } from "@/repositories/MeasureRepository";
import { FindMeasureByIdUseCase } from "@/useCase/measure/FindMeasureByIdUseCase";

export function makeFindMeasureByIdController(): FindMeasureByIdController {
  const repo = new MeasureRepository(prisma);

  const findMeasureById = new FindMeasureByIdUseCase(repo);

  return new FindMeasureByIdController(findMeasureById);
}
