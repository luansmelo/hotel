import { IngredientRepository } from "@/infra/db/mysql/ingredient/IngredientRepository";
import { CountIngredientsController } from "@/presentation/controllers/ingredient/CountIngredientsController";
import { CountTotalIngredientsUseCase } from "@/data/usecases/input/CountTotalIngredientsUseCase";

export function makeCountIngredientsController(): CountIngredientsController {
  const repository = new IngredientRepository();
  const ingredients = new CountTotalIngredientsUseCase(repository);
  return new CountIngredientsController(ingredients);
}
