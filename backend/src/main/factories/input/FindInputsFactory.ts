import { FindInputsController } from "@/presentation/controllers/input/FindInputController";

import { FindInputsUseCase } from "@/data/usecases/input/FindInputsUseCase";

import { InputRepository } from "@/infra/db/mysql/input/InputRepository";
import { SortInputValidator } from "@/validation/validators/SortInputValidator";
import { ValidationComposite } from "@/validation/validators";

export function makeFindInputsController(): FindInputsController {
  const repo = new InputRepository();

  const inputs = new FindInputsUseCase(repo);

  const validation = new SortInputValidator();
  
  const composition = new ValidationComposite([validation]);

  return new FindInputsController(inputs, composition);
}
