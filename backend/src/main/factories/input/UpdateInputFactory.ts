import prisma from "@/config/prisma";

import { UpdateInputController } from "@/presentation/controllers/input/UpdateInputController";
import { GroupRepository } from "@/infra/db/mysql/GroupRepository";
import { InputRepository } from "@/infra/db/mysql/InputRepository";
import { MeasureRepository } from "@/infra/db/mysql/MeasureRepository";
import { FindGroupsByIdUseCase } from "@/data/usecases/group/FindGroupsByIdUseCase";
import { FindInputByIdUseCase } from "@/data/usecases/input/FindInputByIdUseCase";
import { UpdateInputUseCase } from "@/data/usecases/input/UpdateInputUseCase";
import { FindMeasureByIdUseCase } from "@/data/usecases/measure/FindMeasureByIdUseCase";
import { makeInputValidationFactory } from "./InputValidationFactory";

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

  const validator = makeInputValidationFactory()

  return new UpdateInputController(updateInput, validator);
}
