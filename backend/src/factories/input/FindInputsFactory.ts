import prisma from "@/config/prisma";

import { FindInputsController } from "@/controllers/input/FindInputController";
import { InputRepository } from "@/repositories/input.repository";
import { FindInputsUseCase } from "@/useCase/input/FindInputsUseCase";

export function makeFindInputsController(): FindInputsController {
  const repo = new InputRepository(prisma);

  const inputs = new FindInputsUseCase(repo);

  return new FindInputsController(inputs);
}
