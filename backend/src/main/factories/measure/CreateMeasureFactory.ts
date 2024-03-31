import prisma from "@/config/prisma";

import { CreateMeasureController } from "@/presentation/controllers/measure/CreateMeasureController";
import { MeasureRepository } from "@/infra/db/mysql/MeasureRepository";
import { CreateMeasureUseCase } from "@/data/usecases/measure/CreateMeasureUseCase";
import { FindMeasureByNameUseCase } from "@/data/usecases/measure/FindMeasureByNameUseCase";

export function makeCreateMeasureController(): CreateMeasureController {
  const repo = new MeasureRepository(prisma);

  const findMeasureByName = new FindMeasureByNameUseCase(repo);

  const createCategory = new CreateMeasureUseCase(repo, findMeasureByName);

  return new CreateMeasureController(createCategory);
}
