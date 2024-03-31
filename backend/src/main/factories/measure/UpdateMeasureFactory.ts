import prisma from "@/config/prisma";
import { UpdateMeasureController } from "@/presentation/controllers/measure/UpdateMeasureController";
import { MeasureRepository } from "@/infra/db/mysql/MeasureRepository";
import { FindMeasureByIdUseCase } from "@/data/usecases/measure/FindMeasureByIdUseCase";
import { UpdateMeasureUseCase } from "@/data/usecases/measure/UpdateMeasureUseCase";

export function makeUpdateMeasureController(): UpdateMeasureController {
  const repo = new MeasureRepository(prisma);

  const findMeasureById = new FindMeasureByIdUseCase(repo);

  const updateMeasure = new UpdateMeasureUseCase(repo, findMeasureById);

  return new UpdateMeasureController(updateMeasure);
}
