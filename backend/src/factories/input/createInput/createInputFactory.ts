import prisma from "@/config/prisma";
import { CreateInputController } from "@/controllers/input/createInput/createInputController";
import { InputRepository } from "@/repositories/input.repository";
import { CreateInputUseCase } from "@/useCase/input/createInput/createInput";
import { FindInputByCodeUseCase } from "@/useCase/input/findInputByCode/findInputByCode";
import { FindInputByNameUseCase } from "@/useCase/input/findInputByName/findInputByName";

export function makeCreateInputController(): CreateInputController {
  const repo = new InputRepository(prisma);

  const findInputByName = new FindInputByNameUseCase(repo);

  const findInputByCode = new FindInputByCodeUseCase(repo);

  const createCategory = new CreateInputUseCase(
    repo,
    findInputByName,
    findInputByCode
  );

  return new CreateInputController(createCategory);
}
