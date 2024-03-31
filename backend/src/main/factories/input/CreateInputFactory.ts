import prisma from "@/config/prisma";

import { CreateInputController } from "@/presentation/controllers/input/CreateInputController";
import { InputRepository } from "@/infra/db/mysql/InputRepository";

import { CreateInputUseCase } from "@/data/usecases/input/CreateInputUseCase";
import { makeInputValidationFactory } from "./InputValidationFactory";
import { GroupRepository } from "@/infra/db/mysql/group/GroupRepository";
import { MeasureRepository } from "@/infra/db/mysql/measure/MeasureRepository";

export function makeCreateInputController(): CreateInputController {
  const repo = new InputRepository(prisma);

  const measureRepo = new MeasureRepository();
  
  const groupRepo = new GroupRepository();

  const createCategory = new CreateInputUseCase(
    repo,
    repo,
    repo,
    measureRepo,
    groupRepo
  );

  const validator = makeInputValidationFactory()

  return new CreateInputController(createCategory, validator);
}
