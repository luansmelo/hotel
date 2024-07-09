import { FindInputsController } from "@/presentation/controllers/ingredient/FindIngredientController";
import { FindInputsUseCase } from "@/data/usecases/input/FindInputsUseCase";
import { IngredientRepository } from "@/infra/db/mysql/ingredient/IngredientRepository";
import { SortInputValidator } from "@/validation/validators/SortInputValidator";
import { ValidationComposite } from "@/validation/validators";

export function makeFindInputsController(): FindInputsController {
  const repo = new IngredientRepository();

  const inputs = new FindInputsUseCase(repo);

  const validation = new SortInputValidator();
  
  const composition = new ValidationComposite([validation]);

  return new FindInputsController(inputs, composition);
}
