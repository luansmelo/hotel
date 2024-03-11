import prisma from "@/config/prisma";

import { CreateMeasureController } from "@/controllers/measure/CreateMeasureController";
import { MeasureRepository } from "@/repositories/measure.repository";
import { CreateMeasureUseCase } from "@/useCase/measure/createMeasure/createMeasure";
import { FindMeasureByNameUseCase } from "@/useCase/measure/findMeasureByName/findMeasureByName";

export function makeCreateMeasureController(): CreateMeasureController {
  const repo = new MeasureRepository(prisma);

  const findMeasureByName = new FindMeasureByNameUseCase(repo);

  const createCategory = new CreateMeasureUseCase(repo, findMeasureByName);

  return new CreateMeasureController(createCategory);
}
