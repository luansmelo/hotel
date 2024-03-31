import { LoadMeasuresUseCase } from "@/data/usecases/measure/LoadMeasuresUseCase";
import { MeasureRepository } from "@/infra/db/mysql/measure/MeasureRepository";
import { FindMeasuresController } from "@/presentation/controllers/measure/FindMeasuresController";

export function makeFindMeasuresController(): FindMeasuresController {
  const repo = new MeasureRepository();

  const measures = new LoadMeasuresUseCase(repo);

  return new FindMeasuresController(measures);
}
