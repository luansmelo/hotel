import prisma from "@/config/prisma";

import { UpdateInputController } from "@/controllers/input/UpdateInputController";
import { GroupRepository } from "@/repositories/GroupRepository";
import { InputRepository } from "@/repositories/InputRepository";
import { MeasureRepository } from "@/repositories/MeasureRepository";
import { FindGroupsByIdUseCase } from "@/useCase/group/FindGroupsByIdUseCase";
import { FindInputByIdUseCase } from "@/useCase/input/FindInputByIdUseCase";
import { UpdateInputUseCase } from "@/useCase/input/UpdateInputUseCase";
import { FindMeasureByIdUseCase } from "@/useCase/measure/FindMeasureByIdUseCase";

export function makeUpdateInputController(): UpdateInputController {
  const repo = new InputRepository(prisma);
  const measureRepo = new MeasureRepository(prisma);
  const groupRepo = new GroupRepository(prisma);

  const findInputById = new FindInputByIdUseCase(repo);

  const findMeasureById = new FindMeasureByIdUseCase(measureRepo);

  const findGroupsById = new FindGroupsByIdUseCase(groupRepo);

  const updateInput = new UpdateInputUseCase(
    repo,
    findInputById,
    findMeasureById,
    findGroupsById
  );

  return new UpdateInputController(updateInput);
}
