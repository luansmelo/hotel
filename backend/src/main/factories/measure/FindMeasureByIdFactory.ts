import { FindMeasureByIdController } from "@/presentation/controllers/measure/FindMeasureByIdController";
import { MeasureRepository } from "@/infra/db/mysql/measure/MeasureRepository";
import { LoadMeasureByIdUseCase } from "@/data/usecases/measure/LoadMeasureByIdUseCase";

export function makeFindMeasureByIdController(): FindMeasureByIdController {
  const repo = new MeasureRepository();

  const findMeasureById = new LoadMeasureByIdUseCase(repo);

  return new FindMeasureByIdController(findMeasureById);
}
