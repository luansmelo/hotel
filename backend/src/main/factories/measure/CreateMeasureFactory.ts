import { CreateMeasureController } from "@/presentation/controllers/measure/CreateMeasureController";
import { CreateMeasureUseCase } from "@/data/usecases/measure/CreateMeasureUseCase";
import { MeasureRepository } from "@/infra/db/mysql/measure/MeasureRepository";

export function makeCreateMeasureController(): CreateMeasureController {
  const repo = new MeasureRepository();
  const createCategory = new CreateMeasureUseCase(repo, repo);

  return new CreateMeasureController(createCategory);
}
