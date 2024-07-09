import { DeleteInputController } from "@/presentation/controllers/ingredient/DeleteIngredientController";
import { DeleteInputUseCase } from "@/data/usecases/input/DeleteInputUseCase";
import { IngredientRepository } from "@/infra/db/mysql/ingredient/IngredientRepository";

export function makeDeleteInputController(): DeleteInputController {
  const repo = new IngredientRepository();

  const deleteInput = new DeleteInputUseCase(repo, repo);

  return new DeleteInputController(deleteInput);
}
