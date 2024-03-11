import prisma from "@/config/prisma";

import { UpdateInputController } from "@/controllers/input/updateInput/updateInputController";
import { GroupRepository } from "@/repositories/group.repository";
import { InputRepository } from "@/repositories/input.repository";
import { MeasureRepository } from "@/repositories/measure.repository";
import { FindGroupsByIdUseCase } from "@/useCase/group/findGroupsById/findGroupsById";
import { FindInputByIdUseCase } from "@/useCase/input/findInputById/findInputById";
import { UpdateInputUseCase } from "@/useCase/input/updateInput/updateInput";
import { FindMeasureByIdUseCase } from "@/useCase/measure/findMeasureById/findMeasureById";

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
