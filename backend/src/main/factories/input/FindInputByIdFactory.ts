import { FindIngredientByIdController } from "@/presentation/controllers/ingredient/FindIngredientByIdController";
import { IngredientRepository } from "@/infra/db/mysql/ingredient/IngredientRepository";
import { LoadInputByIdUseCase } from "@/data/usecases/input/FindInputByIdUseCase";

export function makeFindIngredientByIdController(): FindIngredientByIdController {
  const repo = new IngredientRepository();

  const input = new LoadInputByIdUseCase(repo);

  return new FindIngredientByIdController(input);
}
