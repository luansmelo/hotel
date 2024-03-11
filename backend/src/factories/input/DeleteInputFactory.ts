import prisma from "@/config/prisma";

import { DeleteInputController } from "@/controllers/input/DeleteInputController";
import { InputRepository } from "@/repositories/input.repository";
import { DeleteInputUseCase } from "@/useCase/input/deleteInput/deleteInput";
import { FindInputByIdUseCase } from "@/useCase/input/findInputById/findInputById";

export function makeDeleteInputController(): DeleteInputController {
  const repo = new InputRepository(prisma);

  const findInputById = new FindInputByIdUseCase(repo);

  const deleteInput = new DeleteInputUseCase(repo, findInputById);

  return new DeleteInputController(deleteInput);
}
