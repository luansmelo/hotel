import prisma from "@/config/prisma";

import { FindInputByIdController } from "@/controllers/input/FindInputByIdController";
import { InputRepository } from "@/repositories/input.repository";
import { FindInputByIdUseCase } from "@/useCase/input/FindInputByIdUseCase";

export function makeFindInputByIdController(): FindInputByIdController {
  const repo = new InputRepository(prisma);

  const input = new FindInputByIdUseCase(repo);

  return new FindInputByIdController(input);
}
