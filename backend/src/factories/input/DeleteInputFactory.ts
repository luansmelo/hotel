import prisma from "@/config/prisma";

import { DeleteInputController } from "@/controllers/input/DeleteInputController";
import { InputRepository } from "@/repositories/InputRepository";
import { DeleteInputUseCase } from "@/useCase/input/DeleteInputUseCase";
import { FindInputByIdUseCase } from "@/useCase/input/FindInputByIdUseCase";

export function makeDeleteInputController(): DeleteInputController {
  const repo = new InputRepository(prisma);

  const findInputById = new FindInputByIdUseCase(repo);

  const deleteInput = new DeleteInputUseCase(repo, findInputById);

  return new DeleteInputController(deleteInput);
}
