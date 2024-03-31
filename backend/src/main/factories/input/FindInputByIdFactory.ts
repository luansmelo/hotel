import prisma from "@/config/prisma";

import { FindInputByIdController } from "@/presentation/controllers/input/FindInputByIdController";
import { InputRepository } from "@/infra/db/mysql/InputRepository";
import { FindInputByIdUseCase } from "@/data/usecases/input/FindInputByIdUseCase";

export function makeFindInputByIdController(): FindInputByIdController {
  const repo = new InputRepository(prisma);

  const input = new FindInputByIdUseCase(repo);

  return new FindInputByIdController(input);
}
