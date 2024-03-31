
import { UpdateMeasureController } from "@/presentation/controllers/measure/UpdateMeasureController";
import { UpdateMeasureUseCase } from "@/data/usecases/measure/UpdateMeasureUseCase";
import { MeasureRepository } from "@/infra/db/mysql/measure/MeasureRepository";

export function makeUpdateMeasureController(): UpdateMeasureController {
  const repo = new MeasureRepository();

  const updateMeasure = new UpdateMeasureUseCase(repo, repo);

  return new UpdateMeasureController(updateMeasure);
}
