import prisma from "@/config/prisma";

import { CreateInputController } from "@/presentation/controllers/input/CreateInputController";
import { GroupRepository } from "@/infra/db/mysql/GroupRepository";
import { InputRepository } from "@/infra/db/mysql/InputRepository";
import { MeasureRepository } from "@/infra/db/mysql/MeasureRepository";
import { FindGroupByIdUseCase } from "@/data/usecases/group/FindGroupByIdUseCase";
import { CreateInputUseCase } from "@/data/usecases/input/CreateInputUseCase";
import { FindInputByCodeUseCase } from "@/data/usecases/input/FindInputByCodeUseCase";
import { FindInputByNameUseCase } from "@/data/usecases/input/FindInputByNameUseCase";
import { FindMeasureByIdUseCase } from "@/data/usecases/measure/FindMeasureByIdUseCase";
import { makeInputValidationFactory } from "./InputValidationFactory";

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

  const validator = makeInputValidationFactory()

  return new CreateInputController(createCategory, validator);
}
