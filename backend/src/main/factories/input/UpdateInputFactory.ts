import prisma from "@/config/prisma";

import { UpdateInputController } from "@/presentation/controllers/input/UpdateInputController";
import { InputRepository } from "@/infra/db/mysql/InputRepository";

import { FindInputByIdUseCase } from "@/data/usecases/input/FindInputByIdUseCase";
import { UpdateInputUseCase } from "@/data/usecases/input/UpdateInputUseCase";

import { makeInputValidationFactory } from "./InputValidationFactory";
import { GroupRepository } from "@/infra/db/mysql/group/GroupRepository";
import { MeasureRepository } from "@/infra/db/mysql/measure/MeasureRepository";

export function makeUpdateInputController(): UpdateInputController {
  const repo = new InputRepository(prisma);
  const measureRepo = new MeasureRepository();
  const groupRepo = new GroupRepository();

  const findInputById = new FindInputByIdUseCase(repo);

  const updateInput = new UpdateInputUseCase(
    repo,
    findInputById,
    measureRepo,
    groupRepo
  );

  const validator = makeInputValidationFactory()

  return new UpdateInputController(updateInput, validator);
}
