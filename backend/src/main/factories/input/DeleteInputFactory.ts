import prisma from "@/config/prisma";

import { DeleteInputController } from "@/presentation/controllers/input/DeleteInputController";
import { InputRepository } from "@/infra/db/mysql/InputRepository";
import { DeleteInputUseCase } from "@/data/usecases/input/DeleteInputUseCase";
import { FindInputByIdUseCase } from "@/data/usecases/input/FindInputByIdUseCase";

export function makeDeleteInputController(): DeleteInputController {
  const repo = new InputRepository(prisma);

  const findInputById = new FindInputByIdUseCase(repo);

  const deleteInput = new DeleteInputUseCase(repo, findInputById);

  return new DeleteInputController(deleteInput);
}
