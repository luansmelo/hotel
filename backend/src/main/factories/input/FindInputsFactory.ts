import prisma from "@/config/prisma";

import { FindInputsController } from "@/presentation/controllers/input/FindInputController";
import { InputRepository } from "@/infra/db/mysql/InputRepository";
import { FindInputsUseCase } from "@/data/usecases/input/FindInputsUseCase";
import { SortInputValidator } from "@/validators/sort/SortInputValidator";
import { ValidationComposite } from "@/validators/ValidationComposition";

export function makeFindInputsController(): FindInputsController {
  const repo = new InputRepository(prisma);

  const inputs = new FindInputsUseCase(repo);

  const validation = new SortInputValidator();
  
  const composition = new ValidationComposite([validation]);

  return new FindInputsController(inputs, composition);
}
