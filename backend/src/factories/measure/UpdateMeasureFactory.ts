import prisma from "@/config/prisma";
import { UpdateMeasureController } from "@/controllers/measure/UpdateMeasureController";
import { MeasureRepository } from "@/repositories/measure.repository";
import { FindMeasureByIdUseCase } from "@/useCase/measure/findMeasureById/findMeasureById";
import { UpdateMeasureUseCase } from "@/useCase/measure/updateMeasure/updateMeasure";

export function makeUpdateMeasureController(): UpdateMeasureController {
  const repo = new MeasureRepository(prisma);

  const findMeasureById = new FindMeasureByIdUseCase(repo);

  const updateMeasure = new UpdateMeasureUseCase(repo, findMeasureById);

  return new UpdateMeasureController(updateMeasure);
}
