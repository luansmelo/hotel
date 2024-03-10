import prisma from "@/config/prisma";
import { CreateInputController } from "@/controllers/input/createInput/createInputController";
import { GroupRepository } from "@/repositories/group.repository";
import { InputRepository } from "@/repositories/input.repository";
import { MeasureRepository } from "@/repositories/measure.repository";
import { FindGroupByIdUseCase } from "@/useCase/group/findGroupById/findGroupById";
import { CreateInputUseCase } from "@/useCase/input/createInput/createInput";
import { FindInputByCodeUseCase } from "@/useCase/input/findInputByCode/findInputByCode";
import { FindInputByNameUseCase } from "@/useCase/input/findInputByName/findInputByName";
import { FindMeasureByIdUseCase } from "@/useCase/measure/findMeasureById/findMeasureById";

export function makeCreateInputController(): CreateInputController {
  const repo = new InputRepository(prisma);
  const measureRepo = new MeasureRepository(prisma);
  const groupRepo = new GroupRepository(prisma);

  const findInputByName = new FindInputByNameUseCase(repo);

  const findInputByCode = new FindInputByCodeUseCase(repo);

  const findMeasureById = new FindMeasureByIdUseCase(measureRepo);

  const findGroupById = new FindGroupByIdUseCase(groupRepo);

  const createCategory = new CreateInputUseCase(
    repo,
    findInputByName,
    findInputByCode,
    findMeasureById,
    findGroupById
  );

  return new CreateInputController(createCategory);
}
