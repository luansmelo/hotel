import prisma from "@/config/prisma";

import { UpdateInputController } from "@/controllers/input/updateInput/updateInputController";
import { InputRepository } from "@/repositories/input.repository";
import { FindInputByIdUseCase } from "@/useCase/input/findInputById/findInputById";
import { UpdateInputUseCase } from "@/useCase/input/updateInput/updateInput";

export function makeUpdateInputController(): UpdateInputController {
  const repo = new InputRepository(prisma);

  const findInputById = new FindInputByIdUseCase(repo);

  const updateInput = new UpdateInputUseCase(repo, findInputById);

  return new UpdateInputController(updateInput);
}
