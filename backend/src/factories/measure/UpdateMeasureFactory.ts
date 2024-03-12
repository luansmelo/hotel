import prisma from "@/config/prisma";
import { UpdateMeasureController } from "@/controllers/measure/UpdateMeasureController";
import { MeasureRepository } from "@/repositories/MeasureRepository";
import { FindMeasureByIdUseCase } from "@/useCase/measure/FindMeasureByIdUseCase";
import { UpdateMeasureUseCase } from "@/useCase/measure/UpdateMeasureUseCase";

export function makeUpdateMeasureController(): UpdateMeasureController {
  const repo = new MeasureRepository(prisma);

  const findMeasureById = new FindMeasureByIdUseCase(repo);

  const updateMeasure = new UpdateMeasureUseCase(repo, findMeasureById);

  return new UpdateMeasureController(updateMeasure);
}
