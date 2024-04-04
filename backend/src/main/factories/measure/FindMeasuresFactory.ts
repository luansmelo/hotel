import { LoadMeasuresUseCase } from "@/data/usecases/measure/LoadMeasuresUseCase";
import { MeasureRepository } from "@/infra/db/mysql/measure/MeasureRepository";
import { FindMeasuresController } from "@/presentation/controllers/measure/FindMeasuresController";
import { ValidationComposite } from "@/validation/validators";
import { SortMeasureValidator } from "@/validation/validators/SortMeasureValidator";

export function makeFindMeasuresController(): FindMeasuresController {
  const repo = new MeasureRepository();

  const measures = new LoadMeasuresUseCase(repo);

  const validation = new SortMeasureValidator();

  const composition = new ValidationComposite([validation]);

  return new FindMeasuresController(measures, composition);
}
