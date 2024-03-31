import { DeleteMeasureController } from "@/presentation/controllers/measure/DeleteMeasureController";
import { DeleteMeasureUseCase } from "@/data/usecases/measure/DeleteMeasuresUseCase";
import { MeasureRepository } from "@/infra/db/mysql/measure/MeasureRepository";

export function makeDeleteMeasureController(): DeleteMeasureController {
  const repo = new MeasureRepository();

  const deleteMeasure = new DeleteMeasureUseCase(repo, repo);

  return new DeleteMeasureController(deleteMeasure);
}
